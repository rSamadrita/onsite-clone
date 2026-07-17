import "./Dashboard.css";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MdFolder,
  MdCurrencyRupee,
  MdPeople,
  MdBusiness,
  MdPayments,
  MdEvent,
  MdCategory,
  MdAssignment,
} from "react-icons/md";

import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import StatsCard from "../../components/StatsCard/StatsCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import DeleteProjectModal from "../../components/DeleteProjectModal/DeleteProjectModal";

import { deleteProject } from "../../redux/slices/projectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);
  const allTransactions = useSelector((state) => state.transactions.byProject);
  const allAttendance = useSelector((state) => state.attendance.byProject);
  const allTasks = useSelector((state) => state.tasks.byProject);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Calculate total budget from all projects
  const totalBudget = useMemo(() => {
    return projects.reduce((sum, project) => sum + (parseFloat(project.value) || 0), 0);
  }, [projects]);

  // Calculate total expenses from all transactions
  const totalExpenses = useMemo(() => {
    let total = 0;
    Object.values(allTransactions).forEach((projectTransactions) => {
      projectTransactions.forEach((transaction) => {
        if (transaction.type === 'expense') {
          total += parseFloat(transaction.amount) || 0;
        }
      });
    });
    return total;
  }, [allTransactions]);

  // Calculate total workers from today's attendance
  const workersToday = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    let count = 0;
    Object.values(allAttendance).forEach((projectAttendance) => {
      const todayRecords = projectAttendance.records?.[today] || {};
      Object.values(todayRecords).forEach((status) => {
        if (status === 'present') count++;
      });
    });
    return count;
  }, [allAttendance]);

  // Calculate project status counts
  const { activeCount, completedCount, upcomingCount } = useMemo(() => {
    const now = new Date();
    let active = 0;
    let completed = 0;
    let upcoming = 0;

    projects.forEach((project) => {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
      
      if (endDate < now) {
        completed++;
      } else if (startDate > now) {
        upcoming++;
      } else {
        active++;
      }
    });

    return { activeCount: active, completedCount: completed, upcomingCount: upcoming };
  }, [projects]);

  // Get recent activity from all sources
  const recentActivity = useMemo(() => {
    const activities = [];
    const today = new Date().toISOString().split('T')[0];

    // Add today's transactions
    Object.entries(allTransactions).forEach(([projectId, transactions]) => {
      const project = projects.find(p => p.id === projectId);
      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt).toISOString().split('T')[0];
        if (transactionDate === today) {
          activities.push({
            type: transaction.type === 'expense' ? 'expense' : 'income',
            title: `${transaction.type === 'expense' ? 'Expense' : 'Income'}: ₹${transaction.amount}`,
            description: `${project?.name || 'Unknown Project'} - ${transaction.category || 'Uncategorized'}`,
            time: new Date(transaction.createdAt),
            color: transaction.type === 'expense' ? '#F59E0B' : '#10B981'
          });
        }
      });
    });

    // Add today's attendance
    Object.entries(allAttendance).forEach(([projectId, attendance]) => {
      const project = projects.find(p => p.id === projectId);
      const todayRecords = attendance.records?.[today] || {};
      const presentCount = Object.values(todayRecords).filter(status => status === 'present').length;
      if (presentCount > 0) {
        activities.push({
          type: 'attendance',
          title: `${presentCount} worker${presentCount > 1 ? 's' : ''} marked attendance`,
          description: project?.name || 'Unknown Project',
          time: new Date(),
          color: '#3B82F6'
        });
      }
    });

    // Add completed tasks
    Object.entries(allTasks).forEach(([projectId, tasks]) => {
      const project = projects.find(p => p.id === projectId);
      tasks.forEach((task) => {
        if (task.status === 'completed') {
          const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
          if (taskDate === today) {
            activities.push({
              type: 'task',
              title: `Task completed: ${task.title}`,
              description: project?.name || 'Unknown Project',
              time: new Date(task.createdAt),
              color: '#10B981'
            });
          }
        }
      });
    });

    // Sort by time descending and take top 3
    return activities.sort((a, b) => b.time - a.time).slice(0, 3);
  }, [allTransactions, allAttendance, allTasks, projects]);

  // Calculate previous month comparison for trending
  const trends = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentMonthExpenses = 0;
    let lastMonthExpenses = 0;

    Object.values(allTransactions).forEach((projectTransactions) => {
      projectTransactions.forEach((transaction) => {
        if (transaction.type === 'expense') {
          const transactionDate = new Date(transaction.createdAt);
          const transactionMonth = transactionDate.getMonth();
          const transactionYear = transactionDate.getFullYear();
          
          if (transactionMonth === currentMonth && transactionYear === currentYear) {
            currentMonthExpenses += parseFloat(transaction.amount) || 0;
          } else if (transactionMonth === lastMonth && transactionYear === lastMonthYear) {
            lastMonthExpenses += parseFloat(transaction.amount) || 0;
          }
        }
      });
    });

    const expenseChange = lastMonthExpenses > 0 
      ? Math.round(((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100)
      : 0;

    return {
      expenseChange,
      expenseTrending: expenseChange <= 0 ? 'down' : 'up'
    };
  }, [allTransactions]);

  const userName = "Samadrita";

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="dashboard-container">
      <div className="dashboard-page">
        {/* =========================
            GREETING & DATE HEADER with CREATE PROJECT BUTTON
      ========================== */}
        <div className="dashboard-greeting-header">
          <div>
            <h1 className="greeting-title">{greeting}, {userName} </h1>
            <p className="greeting-subtitle">Here's what's happening with your projects today.</p>
          </div>
          <div className="header-actions">
            <div className="date-display">
              📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <button className="create-project-header-btn" onClick={() => setShowModal(true)}>
              + Create Project
            </button>
          </div>
        </div>

        {/* =========================
            HERO CAROUSEL
      ========================== */}
        <HeroCarousel />

        {/* =========================
            KPI CARDS
      ========================== */}

        <div className="stats-grid">
          <StatsCard
            title="Total Projects"
            value={projects.length}
            change={projects.length > 0 ? `${projects.filter(p => {
              const createdDate = new Date(p.createdAt);
              const now = new Date();
              const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
              return createdDate > monthAgo;
            }).length} new this month` : 'No projects yet'}
            trending="up"
            color="#8B3A3A"
            icon={<MdFolder />}
          />

          <StatsCard
            title="Total Budget"
            value={totalBudget > 0 ? `₹${(totalBudget / 10000000).toFixed(2)} Cr` : '₹0'}
            change={totalBudget > 0 ? 'Total allocated' : 'No budget set'}
            trending="up"
            color="#F59E0B"
            icon={<MdCurrencyRupee />}
          />

          <StatsCard
            title="Total Expenses"
            value={totalExpenses > 0 ? `₹${(totalExpenses / 100000).toFixed(2)} L` : '₹0'}
            change={totalExpenses > 0 && trends.expenseChange !== 0 
              ? `${Math.abs(trends.expenseChange)}% vs last month` 
              : totalExpenses > 0 ? 'No comparison data' : 'No expenses yet'}
            trending={trends.expenseTrending}
            color="#3B82F6"
            icon={<MdCurrencyRupee />}
          />

          <StatsCard
            title="Total Workers"
            value={workersToday}
            change={workersToday > 0 ? 'Present today' : 'No attendance marked'}
            trending="up"
            color="#10B981"
            icon={<MdPeople />}
          />
        </div>

        {/* =========================
        ANALYTICS SECTION
      ========================== */}
        
        <div className="analytics-grid">
          {/* Budget vs Expenses Chart */}
          <div className="chart-card budget-chart-card">
            <div className="chart-header">
              <h3>Budget vs Expenses</h3>
              <select className="chart-filter">
                <option>This Year</option>
                <option>Last Year</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="budget-chart">
              <svg viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                <line x1="40" y1="200" x2="560" y2="200" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="40" y1="150" x2="560" y2="150" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="40" y1="100" x2="560" y2="100" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="40" y1="50" x2="560" y2="50" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="40" y1="10" x2="560" y2="10" stroke="#E5E7EB" strokeWidth="1"/>
                
                {/* Y-axis labels */}
                <text x="10" y="205" fontSize="10" fill="#6B7280">0</text>
                <text x="10" y="155" fontSize="10" fill="#6B7280">20L</text>
                <text x="10" y="105" fontSize="10" fill="#6B7280">40L</text>
                <text x="10" y="55" fontSize="10" fill="#6B7280">60L</text>
                <text x="10" y="15" fontSize="10" fill="#6B7280">80L</text>
                
                {/* Budget line (red/pink) */}
                <polyline
                  points="40,170 120,145 200,125 280,115 360,105 440,95 520,85 560,82"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2.5"
                />
                {/* Budget area */}
                <polygon
                  points="40,170 120,145 200,125 280,115 360,105 440,95 520,85 560,82 560,200 40,200"
                  fill="rgba(220, 38, 38, 0.1)"
                />
                {/* Budget dots */}
                <circle cx="40" cy="170" r="4" fill="#DC2626"/>
                <circle cx="120" cy="145" r="4" fill="#DC2626"/>
                <circle cx="200" cy="125" r="4" fill="#DC2626"/>
                <circle cx="280" cy="115" r="4" fill="#DC2626"/>
                <circle cx="360" cy="105" r="4" fill="#DC2626"/>
                <circle cx="440" cy="95" r="4" fill="#DC2626"/>
                <circle cx="520" cy="85" r="4" fill="#DC2626"/>
                <circle cx="560" cy="82" r="4" fill="#DC2626"/>
                
                {/* Expenses line (blue) */}
                <polyline
                  points="40,195 120,180 200,165 280,155 360,145 440,135 520,125 560,120"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                />
                {/* Expenses area */}
                <polygon
                  points="40,195 120,180 200,165 280,155 360,145 440,135 520,125 560,120 560,200 40,200"
                  fill="rgba(59, 130, 246, 0.1)"
                />
                {/* Expenses dots */}
                <circle cx="40" cy="195" r="4" fill="#3B82F6"/>
                <circle cx="120" cy="180" r="4" fill="#3B82F6"/>
                <circle cx="200" cy="165" r="4" fill="#3B82F6"/>
                <circle cx="280" cy="155" r="4" fill="#3B82F6"/>
                <circle cx="360" cy="145" r="4" fill="#3B82F6"/>
                <circle cx="440" cy="135" r="4" fill="#3B82F6"/>
                <circle cx="520" cy="125" r="4" fill="#3B82F6"/>
                <circle cx="560" cy="120" r="4" fill="#3B82F6"/>
                
                {/* X-axis labels */}
                <text x="35" y="220" fontSize="11" fill="#6B7280">Jan</text>
                <text x="115" y="220" fontSize="11" fill="#6B7280">Feb</text>
                <text x="195" y="220" fontSize="11" fill="#6B7280">Mar</text>
                <text x="275" y="220" fontSize="11" fill="#6B7280">Apr</text>
                <text x="355" y="220" fontSize="11" fill="#6B7280">May</text>
                <text x="435" y="220" fontSize="11" fill="#6B7280">Jun</text>
                <text x="515" y="220" fontSize="11" fill="#6B7280">Jul</text>
              </svg>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{backgroundColor: '#DC2626'}}></span>
                  <span>Budget</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{backgroundColor: '#3B82F6'}}></span>
                  <span>Expenses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Status Donut */}
          <div className="chart-card status-chart-card">
            <h3>Project Status</h3>
            <div className="donut-chart-container">
              {projects.length > 0 ? (
                <>
                  <svg viewBox="0 0 200 200" className="donut-chart">
                    {/* Active - Green */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="28"
                      strokeDasharray={`${(activeCount / projects.length) * 440} 440`}
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Completed - Blue */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="28"
                      strokeDasharray={`${(completedCount / projects.length) * 440} 440`}
                      strokeDashoffset={`-${(activeCount / projects.length) * 440}`}
                      transform="rotate(-90 100 100)"
                    />
                    {/* Upcoming - Yellow */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="28"
                      strokeDasharray={`${(upcomingCount / projects.length) * 440} 440`}
                      strokeDashoffset={`-${((activeCount + completedCount) / projects.length) * 440}`}
                      transform="rotate(-90 100 100)"
                    />
                    {/* Center text */}
                    <text x="100" y="95" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1F2937">
                      {projects.length}
                    </text>
                    <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#6B7280">
                      Total
                    </text>
                  </svg>
                  <div className="donut-legend">
                    <div className="donut-legend-item">
                      <span className="donut-dot" style={{backgroundColor: '#10B981'}}></span>
                      <span>Active Projects</span>
                      <strong>{activeCount}</strong>
                    </div>
                    <div className="donut-legend-item">
                      <span className="donut-dot" style={{backgroundColor: '#3B82F6'}}></span>
                      <span>Completed</span>
                      <strong>{completedCount}</strong>
                    </div>
                    <div className="donut-legend-item">
                      <span className="donut-dot" style={{backgroundColor: '#F59E0B'}}></span>
                      <span>Upcoming</span>
                      <strong>{upcomingCount}</strong>
                    </div>
                  </div>
                  <button className="view-all-projects">View All Projects ›</button>
                </>
              ) : (
                <div className="empty-state-donut">
                  <p>No projects yet. Create your first project to see statistics.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================
        QUICK ACTIONS + ACTIVITY
      ========================== */}

        {/* <div className="dashboard-bottom-grid"> */}
          {/* Quick Actions */}
          {/* <section className="quick-actions-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-btn">
                <div className="quick-action-icon" style={{backgroundColor: '#8B3A3A'}}>
                  <MdBusiness />
                </div>
                <span>Add Project</span>
              </button>
              <button className="quick-action-btn">
                <div className="quick-action-icon" style={{backgroundColor: '#F59E0B'}}>
                  <MdPeople />
                </div>
                <span>Add Party</span>
              </button>
              <button className="quick-action-btn">
                <div className="quick-action-icon" style={{backgroundColor: '#3B82F6'}}>
                  <MdEvent />
                </div>
                <span>Mark Attendance</span>
              </button>
              <button className="quick-action-btn">
                <div className="quick-action-icon" style={{backgroundColor: '#10B981'}}>
                  <MdCategory />
                </div>
                <span>Add Material</span>
              </button>
              <button className="quick-action-btn">
                <div className="quick-action-icon" style={{backgroundColor: '#8B5CF6'}}>
                  <MdAssignment />
                </div>
                <span>Create Task</span>
              </button>
              <button className="quick-action-btn">
                <div className="quick-action-icon" style={{backgroundColor: '#EC4899'}}>
                  <MdPayments />
                </div>
                <span>Add Transaction</span>
              </button>
            </div>
          </section> */}

          {/* Today's Activity */}
          {/* <aside className="todays-activity-section">
            <div className="activity-header">
              <h3>Today's Activity</h3>
              <button className="view-full-activity">View Full Activity Log ›</button>
            </div>
            <div className="activity-timeline">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="activity-timeline-item">
                    <span className="activity-timeline-dot" style={{backgroundColor: activity.color}}></span>
                    <div className="activity-timeline-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="activity-time">
                        {activity.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="activity-timeline-item">
                  <span className="activity-timeline-dot" style={{backgroundColor: '#9CA3AF'}}></span>
                  <div className="activity-timeline-content">
                    <h4>No activity today</h4>
                    <p>Start tracking projects to see activity here</p>
                  </div>
                </div>
              )}
            </div>
          </aside> */}
        {/* </div> */}

        {/* =========================
        QUICK ACTIONS + ACTIVITY
      ========================== */}

        {/* <div className="dashboard-middle"> */}
          {/* LEFT */}

          {/* <section className="quick-actions"> */}
            {/* <div className="section-heading">
              <h2>Quick Actions</h2>

              <p>Jump to frequently used modules</p>
            </div> */}

            {/* <div >
              <QuickActionCard
                title="Party"
                subtitle="Clients & Vendors"
                color="#510400"
                icon={<MdBusiness />}
              />

              <QuickActionCard
                title="Attendance"
                subtitle="Daily Workforce"
                color="#27AE60"
                icon={<MdPeople />}
              />

              <QuickActionCard
                title="Materials"
                subtitle="Stock Register"
                color="#2F80ED"
                icon={<MdInventory />}
              />

              <QuickActionCard
                title="Tasks"
                subtitle="Site Activities"
                color="#F2994A"
                icon={<MdChecklist />}
              />

              <QuickActionCard
                title="Transactions"
                subtitle="Income & Expenses"
                color="#9B51E0"
                icon={<MdPayments />}
              />
            </div> */}
          {/* </section> */}

          {/* RIGHT */}

          {/* <aside className="activity-panel">
            <div className="section-heading">
              <h2>Recent Activity</h2>

              <p>Latest updates</p>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot green" />

                <div>
                  <h4>No project updates</h4>

                  <p>Create a project to start tracking progress.</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot blue" />

                <div>
                  <h4>No attendance today</h4>

                  <p>Daily attendance will appear here.</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot orange" />

                <div>
                  <h4>No pending tasks</h4>

                  <p>Upcoming activities will be listed here.</p>
                </div>
              </div>
            </div>
          </aside> */}
        {/* </div> */}

        {/* =========================
          RECENT PROJECTS
      ========================== */}

        <div className="projects-section">
          <div className="section-heading">
            <div>
              <h2>Recent Projects</h2>

              <p>{activeCount} Active Project{activeCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
          {projects.length === 0 ? (
            <div className="empty-project">
              <div className="empty-icon">🏗️</div>

              <h2>No Projects Yet</h2>

              <p>
                Start by creating your first construction project. Once created,
                all your projects will appear here.
              </p>

              <button
                className="create-project-btn"
                onClick={() => setShowModal(true)}
              >
                + Create New Project
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </div>
          )}

          {/* =========================
            CREATE PROJECT MODAL
      ========================== */}

          {showModal && (
            <CreateProjectModal onClose={() => setShowModal(false)} />
          )}

          {/* =========================
            DELETE PROJECT MODAL
      ========================== */}

          {deleteId && (
            <DeleteProjectModal
              onCancel={() => setDeleteId(null)}
              onDelete={() => {
                dispatch(deleteProject(deleteId));

                setDeleteId(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
