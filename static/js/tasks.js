// Task Management
const Tasks = {
    currentTab: 'daily',
    
    async loadDailyTasks() {
        const container = document.getElementById('daily-tasks-list');
        if (!container) return;
        container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading tasks...</p></div>';
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/daily-tasks/`);
            if (response.ok) {
                const data = await response.json();
                const tasks = Array.isArray(data) ? data : (data.results || []);
                this.renderTasks(container, tasks, 'daily');
            } else {
                const error = await response.json().catch(() => ({}));
                console.error('Load tasks error:', error);
                container.innerHTML = '<div class="empty-state"><h3>Error loading tasks</h3><p>Please try again</p></div>';
            }
        } catch (error) {
            console.error('Load tasks exception:', error);
            container.innerHTML = '<div class="empty-state"><h3>Error loading tasks</h3><p>Please refresh the page</p></div>';
        }
    },
    
    async loadDeadlines() {
        const container = document.getElementById('deadlines-list');
        if (!container) return;
        container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading deadlines...</p></div>';
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/deadlines/`);
            if (response.ok) {
                const data = await response.json();
                const deadlines = Array.isArray(data) ? data : (data.results || []);
                this.renderDeadlines(container, deadlines);
            } else {
                const error = await response.json().catch(() => ({}));
                console.error('Load deadlines error:', error);
                container.innerHTML = '<div class="empty-state"><h3>Error loading deadlines</h3><p>Please try again</p></div>';
            }
        } catch (error) {
            console.error('Load deadlines exception:', error);
            container.innerHTML = '<div class="empty-state"><h3>Error loading deadlines</h3><p>Please refresh the page</p></div>';
        }
    },
    
    async loadReminders() {
        const container = document.getElementById('reminders-list');
        if (!container) return;
        container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading reminders...</p></div>';
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/kind-reminders/`);
            if (response.ok) {
                const data = await response.json();
                const reminders = Array.isArray(data) ? data : (data.results || []);
                this.renderReminders(container, reminders);
            } else {
                const error = await response.json().catch(() => ({}));
                console.error('Load reminders error:', error);
                container.innerHTML = '<div class="empty-state"><h3>Error loading reminders</h3><p>Please try again</p></div>';
            }
        } catch (error) {
            console.error('Load reminders exception:', error);
            container.innerHTML = '<div class="empty-state"><h3>Error loading reminders</h3><p>Please refresh the page</p></div>';
        }
    },
    
    async loadSpecialDays() {
        const container = document.getElementById('special-days-list');
        if (!container) return;
        container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading special days...</p></div>';
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/special-days/`);
            if (response.ok) {
                const data = await response.json();
                const specialDays = Array.isArray(data) ? data : (data.results || []);
                this.renderSpecialDays(container, specialDays);
            } else {
                const error = await response.json().catch(() => ({}));
                console.error('Load special days error:', error);
                container.innerHTML = '<div class="empty-state"><h3>Error loading special days</h3><p>Please try again</p></div>';
            }
        } catch (error) {
            console.error('Load special days exception:', error);
            container.innerHTML = '<div class="empty-state"><h3>Error loading special days</h3><p>Please refresh the page</p></div>';
        }
    },
    
    renderTasks(container, tasks, type) {
        if (tasks.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No tasks yet</h3><p>Click "New Task" to create one</p></div>';
            return;
        }
        
        container.innerHTML = tasks.map(task => `
            <div class="task-card ${task.status === 'completed' ? 'completed' : ''}">
                <div class="task-header">
                    <span class="task-status ${task.status}">${task.status}</span>
                </div>
                <div class="task-content">
                    <p>${this.escapeHtml(task.text)}</p>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-primary" onclick="Tasks.editTask(${task.id}, 'daily')">Edit</button>
                    <button class="btn btn-sm ${task.status === 'completed' ? 'btn-outline' : 'btn-success'}" 
                            onclick="Tasks.toggleStatus(${task.id}, 'daily', '${task.status}')">
                        ${task.status === 'completed' ? 'Mark Pending' : 'Complete'}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="Tasks.deleteTask(${task.id}, 'daily')">Delete</button>
                </div>
            </div>
        `).join('');
    },
    
    renderDeadlines(container, deadlines) {
        if (deadlines.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No deadlines yet</h3><p>Click "New Task" to create one</p></div>';
            return;
        }
        
        container.innerHTML = deadlines.map(deadline => `
            <div class="task-card ${deadline.status === 'completed' ? 'completed' : ''}">
                <div class="task-header">
                    <span class="task-status ${deadline.status}">${deadline.status}</span>
                </div>
                <div class="task-content">
                    <h3>${this.escapeHtml(deadline.name || 'Untitled Deadline')}</h3>
                    <div class="task-meta">
                        <span>📅 Start: ${formatDate(deadline.start_date)}</span>
                    </div>
                    <div class="task-meta">
                        <span>🏁 End: ${formatDate(deadline.end_date)}</span>
                    </div>
                    <div class="task-meta">
                        <span>⏰ Remind: ${formatDateTime(deadline.remind_me_at)}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-primary" onclick="Tasks.editTask(${deadline.id}, 'deadlines')">Edit</button>
                    <button class="btn btn-sm ${deadline.status === 'completed' ? 'btn-outline' : 'btn-success'}" 
                            onclick="Tasks.toggleStatus(${deadline.id}, 'deadlines', '${deadline.status}')">
                        ${deadline.status === 'completed' ? 'Mark Pending' : 'Complete'}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="Tasks.deleteTask(${deadline.id}, 'deadlines')">Delete</button>
                </div>
            </div>
        `).join('');
    },
    
    renderReminders(container, reminders) {
        if (reminders.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No reminders yet</h3><p>Click "New Task" to create one</p></div>';
            return;
        }
        
        container.innerHTML = reminders.map(reminder => `
            <div class="task-card ${reminder.status === 'completed' ? 'completed' : ''}">
                <div class="task-header">
                    <span class="task-status ${reminder.status}">${reminder.status}</span>
                </div>
                <div class="task-content">
                    <h3>${this.escapeHtml(reminder.name)}</h3>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-primary" onclick="Tasks.editTask(${reminder.id}, 'reminders')">Edit</button>
                    <button class="btn btn-sm ${reminder.status === 'completed' ? 'btn-outline' : 'btn-success'}" 
                            onclick="Tasks.toggleStatus(${reminder.id}, 'reminders', '${reminder.status}')">
                        ${reminder.status === 'completed' ? 'Mark Pending' : 'Complete'}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="Tasks.deleteTask(${reminder.id}, 'reminders')">Delete</button>
                </div>
            </div>
        `).join('');
    },
    
    renderSpecialDays(container, specialDays) {
        if (specialDays.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No special days yet</h3><p>Click "New Task" to create one</p></div>';
            return;
        }
        
        container.innerHTML = specialDays.map(special => {
            let dateDisplay = '';
            if (special.is_duration && special.start_date && special.end_date) {
                dateDisplay = `${formatDate(special.start_date)} to ${formatDate(special.end_date)}`;
            } else if (special.datetime) {
                dateDisplay = formatDate(special.datetime);
            }
            
            return `
            <div class="task-card">
                <div class="task-content">
                    <h3>${dateDisplay}</h3>
                    <p>${this.escapeHtml(special.description)}</p>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-primary" onclick="Tasks.editTask(${special.id}, 'special')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="Tasks.deleteTask(${special.id}, 'special')">Delete</button>
                </div>
            </div>
        `;
        }).join('');
    },
    
    async saveTask(formData, type) {
        const taskId = document.getElementById('taskId').value;
        const endpoint = this.getEndpoint(type);
        const url = taskId 
            ? `${API_BASE_URL}/${endpoint}/${taskId}/`
            : `${API_BASE_URL}/${endpoint}/`;
        
        const method = taskId ? 'PUT' : 'POST';
        
        console.log('POSTing to:', url);
        console.log('Data:', formData);
        
        const response = await apiRequest(url, {
            method: method,
            body: JSON.stringify(formData)
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            showToast(taskId ? 'Task updated!' : 'Task created!', 'success');
            this.closeModal();
            this.loadCurrentTab();
        } else {
            const errorData = await response.json().catch(() => ({ detail: 'Failed to save task' }));
            console.error('Error response:', errorData);
            const errorMsg = errorData.detail || errorData.message || JSON.stringify(errorData);
            showToast(errorMsg, 'error');
        }
    },
    
    async deleteTask(id, type) {
        if (!confirm('Are you sure you want to delete this task?')) return;
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/${this.getEndpoint(type)}/${id}/`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showToast('Task deleted!', 'success');
                this.loadCurrentTab();
            } else {
                showToast('Failed to delete task', 'error');
            }
        } catch (error) {
            showToast('An error occurred', 'error');
        }
    },
    
    async toggleStatus(id, type, currentStatus) {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        
        try {
            const response = await apiRequest(`${API_BASE_URL}/${this.getEndpoint(type)}/${id}/`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            
            if (response.ok) {
                showToast('Status updated!', 'success');
                this.loadCurrentTab();
            }
        } catch (error) {
            showToast('Failed to update status', 'error');
        }
    },
    
    async editTask(id, type) {
        try {
            const response = await apiRequest(`${API_BASE_URL}/${this.getEndpoint(type)}/${id}/`);
            if (response.ok) {
                const task = await response.json();
                this.openModal(type, task);
            }
        } catch (error) {
            showToast('Failed to load task', 'error');
        }
    },
    
    openModal(type, task = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        
        // Reset form and remove all required attributes
        form.reset();
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.removeAttribute('required');
        });
        
        document.getElementById('taskId').value = task ? task.id : '';
        document.getElementById('taskType').value = type;
        
        // Hide all fields
        document.getElementById('daily-task-fields').style.display = 'none';
        document.getElementById('deadline-fields').style.display = 'none';
        document.getElementById('reminder-fields').style.display = 'none';
        document.getElementById('special-fields').style.display = 'none';
        
        // Show relevant fields and add required attributes
        if (type === 'daily') {
            document.getElementById('daily-task-fields').style.display = 'block';
            document.getElementById('task-text').setAttribute('required', 'required');
            if (task) document.getElementById('task-text').value = task.text || '';
        } else if (type === 'deadlines') {
            document.getElementById('deadline-fields').style.display = 'block';
            document.getElementById('deadline-name').setAttribute('required', 'required');
            document.getElementById('start-date').setAttribute('required', 'required');
            document.getElementById('end-date').setAttribute('required', 'required');
            document.getElementById('remind-me-at').setAttribute('required', 'required');
            if (task) {
                document.getElementById('deadline-name').value = task.name || '';
                document.getElementById('start-date').value = task.start_date || '';
                document.getElementById('end-date').value = task.end_date || '';
                document.getElementById('remind-me-at').value = task.remind_me_at ? task.remind_me_at.slice(0, 16) : '';
            }
        } else if (type === 'reminders') {
            document.getElementById('reminder-fields').style.display = 'block';
            document.getElementById('reminder-name').setAttribute('required', 'required');
            if (task) document.getElementById('reminder-name').value = task.name || '';
        } else if (type === 'special') {
            document.getElementById('special-fields').style.display = 'block';
            document.getElementById('description').setAttribute('required', 'required');
            
            // Setup duration toggle
            const isDurationCheckbox = document.getElementById('is-duration');
            const singleDayFields = document.getElementById('single-day-fields');
            const durationFields = document.getElementById('duration-fields');
            
            if (task) {
                document.getElementById('description').value = task.description || '';
                isDurationCheckbox.checked = task.is_duration || false;
                
                if (task.is_duration) {
                    singleDayFields.style.display = 'none';
                    durationFields.style.display = 'block';
                    document.getElementById('special-start-date').value = task.start_date || '';
                    document.getElementById('special-end-date').value = task.end_date || '';
                    document.getElementById('special-start-date').setAttribute('required', 'required');
                    document.getElementById('special-end-date').setAttribute('required', 'required');
                } else {
                    singleDayFields.style.display = 'block';
                    durationFields.style.display = 'none';
                    document.getElementById('special-datetime').value = task.datetime || '';
                    document.getElementById('special-datetime').setAttribute('required', 'required');
                }
            } else {
                // New task - default to single day
                isDurationCheckbox.checked = false;
                singleDayFields.style.display = 'block';
                durationFields.style.display = 'none';
                document.getElementById('special-datetime').setAttribute('required', 'required');
            }
            
            // Toggle handler
            isDurationCheckbox.onchange = function() {
                if (this.checked) {
                    singleDayFields.style.display = 'none';
                    durationFields.style.display = 'block';
                    document.getElementById('special-datetime').removeAttribute('required');
                    document.getElementById('special-start-date').setAttribute('required', 'required');
                    document.getElementById('special-end-date').setAttribute('required', 'required');
                } else {
                    singleDayFields.style.display = 'block';
                    durationFields.style.display = 'none';
                    document.getElementById('special-datetime').setAttribute('required', 'required');
                    document.getElementById('special-start-date').removeAttribute('required');
                    document.getElementById('special-end-date').removeAttribute('required');
                }
            };
        }
        
        // Set status
        if (task) {
            document.getElementById('status').value = task.status || 'pending';
            document.getElementById('modalTitle').textContent = 'Edit Task';
        } else {
            document.getElementById('status').value = 'pending';
            document.getElementById('modalTitle').textContent = 'New Task';
        }
        
        modal.classList.add('active');
    },
    
    closeModal() {
        document.getElementById('taskModal').classList.remove('active');
    },
    
    getEndpoint(type) {
        const endpoints = {
            'daily': 'daily-tasks',
            'deadlines': 'deadlines',
            'reminders': 'kind-reminders',
            'special': 'special-days'
        };
        return endpoints[type] || 'daily-tasks';
    },
    
    loadCurrentTab() {
        if (this.currentTab === 'daily') this.loadDailyTasks();
        else if (this.currentTab === 'deadlines') this.loadDeadlines();
        else if (this.currentTab === 'reminders') this.loadReminders();
        else if (this.currentTab === 'special') this.loadSpecialDays();
    },
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tab}-tab`).classList.add('active');
            
            Tasks.currentTab = tab;
            Tasks.loadCurrentTab();
        });
    });
    
    // New task button
    document.getElementById('newTaskBtn').addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        Tasks.openModal(activeTab);
    });
    
    // Modal close
    document.getElementById('closeModal').addEventListener('click', () => Tasks.closeModal());
    document.getElementById('cancelBtn').addEventListener('click', () => Tasks.closeModal());
    
    // Task form submission
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Form submitted');
            
            const type = document.getElementById('taskType').value;
            if (!type) {
                showToast('Please select a task type', 'error');
                return;
            }
            
            const submitBtn = taskForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Saving...';
            
            // Build form data based on type
            const formData = { status: document.getElementById('status').value || 'pending' };
            
            if (type === 'daily') {
                const text = document.getElementById('task-text').value.trim();
                if (!text) {
                    showToast('Task text is required', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }
                formData.text = text;
            } else if (type === 'deadlines') {
                formData.name = document.getElementById('deadline-name').value.trim();
                formData.start_date = document.getElementById('start-date').value;
                formData.end_date = document.getElementById('end-date').value;
                formData.remind_me_at = document.getElementById('remind-me-at').value;
                
                if (!formData.name || !formData.start_date || !formData.end_date || !formData.remind_me_at) {
                    showToast('All deadline fields are required', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }
            } else if (type === 'reminders') {
                const name = document.getElementById('reminder-name').value.trim();
                if (!name) {
                    showToast('Reminder name is required', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }
                formData.name = name;
            } else if (type === 'special') {
                formData.description = document.getElementById('description').value.trim();
                formData.is_duration = document.getElementById('is-duration').checked;
                
                if (!formData.description) {
                    showToast('Description is required', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }
                
                if (formData.is_duration) {
                    formData.start_date = document.getElementById('special-start-date').value;
                    formData.end_date = document.getElementById('special-end-date').value;
                    if (!formData.start_date || !formData.end_date) {
                        showToast('Start and end dates are required for duration', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }
                    formData.datetime = null;
                } else {
                    formData.datetime = document.getElementById('special-datetime').value;
                    if (!formData.datetime) {
                        showToast('Date is required', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }
                    formData.start_date = null;
                    formData.end_date = null;
                }
            }
            
            console.log('Form data to save:', formData);
            
            try {
                await Tasks.saveTask(formData, type);
            } catch (error) {
                console.error('Save error:', error);
                showToast('Failed to save: ' + (error.message || 'Unknown error'), 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    } else {
        console.error('Task form not found!');
    }
    
    // Load initial data
    Tasks.loadDailyTasks();
});

