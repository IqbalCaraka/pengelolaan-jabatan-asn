// Dummy Data
const dashboardData = {
    totalJabatan: 450,
    jabatanTerisi: 328,
    jabatanKosong: 122,
    totalPengajuan: 156,
    progressPengajuan: {
        pendaftaran: 35,
        verifikasi: 42,
        sedangUjian: 28,
        penilaian: 24,
        selesai: 27
    },
    jumlahLulus: 89,
    jumlahTidakLulus: 34
};

// Dummy Activity Data
const recentActivities = [
    {
        time: "2 menit yang lalu",
        text: "Ahmad Rizki berhasil menyelesaikan ujian kompetensi untuk jabatan Kepala Seksi Kepegawaian"
    },
    {
        time: "15 menit yang lalu",
        text: "Verifikasi dokumen untuk 5 pengajuan ujian kompetensi telah selesai"
    },
    {
        time: "1 jam yang lalu",
        text: "Siti Nurhaliza mengajukan ujian kompetensi untuk jabatan Analis SDM Aparatur"
    },
    {
        time: "2 jam yang lalu",
        text: "Jabatan Kepala Bidang Mutasi telah terisi oleh Budi Santoso"
    },
    {
        time: "3 jam yang lalu",
        text: "12 peserta ujian kompetensi dinyatakan lulus"
    },
    {
        time: "5 jam yang lalu",
        text: "Pengumuman hasil ujian kompetensi periode November 2025 telah dipublikasikan"
    }
];

// Counter Animation Function
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Progress Bar Animation Function
function animateProgressBar(elementId, value, total) {
    const percentage = (value / total) * 100;
    const element = document.getElementById(elementId);

    setTimeout(() => {
        element.style.width = percentage + '%';
    }, 100);
}

// Initialize Dashboard
function initDashboard() {
    // Animate main cards
    animateCounter(document.getElementById('totalJabatan'), dashboardData.totalJabatan);
    animateCounter(document.getElementById('jabatanTerisi'), dashboardData.jabatanTerisi);
    animateCounter(document.getElementById('jabatanKosong'), dashboardData.jabatanKosong);
    animateCounter(document.getElementById('totalPengajuan'), dashboardData.totalPengajuan);

    // Update combined card progress
    const persenTerisi = ((dashboardData.jabatanTerisi / dashboardData.totalJabatan) * 100).toFixed(1);
    setTimeout(() => {
        const progressElement = document.getElementById('progressTerisi');
        const persenElement = document.getElementById('persenTerisi');
        if (progressElement) {
            progressElement.style.width = persenTerisi + '%';
        }
        if (persenElement) {
            persenElement.textContent = persenTerisi + '%';
        }
    }, 100);

    // Update progress bars
    const progress = dashboardData.progressPengajuan;

    document.getElementById('progPendaftaran').textContent = progress.pendaftaran;
    animateProgressBar('barPendaftaran', progress.pendaftaran, dashboardData.totalPengajuan);

    document.getElementById('progVerifikasi').textContent = progress.verifikasi;
    animateProgressBar('barVerifikasi', progress.verifikasi, dashboardData.totalPengajuan);

    document.getElementById('progUjian').textContent = progress.sedangUjian;
    animateProgressBar('barUjian', progress.sedangUjian, dashboardData.totalPengajuan);

    document.getElementById('progPenilaian').textContent = progress.penilaian;
    animateProgressBar('barPenilaian', progress.penilaian, dashboardData.totalPengajuan);

    document.getElementById('progSelesai').textContent = progress.selesai;
    animateProgressBar('barSelesai', progress.selesai, dashboardData.totalPengajuan);

    // Update results
    animateCounter(document.getElementById('jumlahLulus'), dashboardData.jumlahLulus);
    animateCounter(document.getElementById('jumlahTidakLulus'), dashboardData.jumlahTidakLulus);

    // Calculate percentages
    const totalPeserta = dashboardData.jumlahLulus + dashboardData.jumlahTidakLulus;
    const persenLulus = ((dashboardData.jumlahLulus / totalPeserta) * 100).toFixed(1);
    const persenTidakLulus = ((dashboardData.jumlahTidakLulus / totalPeserta) * 100).toFixed(1);

    // Update total peserta ujian
    const totalPesertaElement = document.getElementById('totalPesertaUjian');
    if (totalPesertaElement) {
        animateCounter(totalPesertaElement, totalPeserta);
    }

    setTimeout(() => {
        // Update percentage text
        document.getElementById('persenLulus').textContent = persenLulus + '%';
        document.getElementById('persenTidakLulus').textContent = persenTidakLulus + '%';

        // Animate progress bars for results
        const progressLulus = document.getElementById('progressLulus');
        const progressTidakLulus = document.getElementById('progressTidakLulus');

        if (progressLulus) {
            progressLulus.style.width = persenLulus + '%';
        }
        if (progressTidakLulus) {
            progressTidakLulus.style.width = persenTidakLulus + '%';
        }
    }, 500);

    // Load recent activities
    loadRecentActivities();
}

// Load Recent Activities
function loadRecentActivities() {
    const activityList = document.getElementById('activityList');

    recentActivities.forEach((activity, index) => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.style.animationDelay = (index * 0.1) + 's';

        activityItem.innerHTML = `
            <div class="activity-time">${activity.time}</div>
            <div class="activity-text">${activity.text}</div>
        `;

        activityList.appendChild(activityItem);
    });
}

// Auto-refresh dashboard (simulate real-time updates)
function autoRefreshDashboard() {
    setInterval(() => {
        // Simulate small random changes in data
        const randomChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

        // You can add logic here to randomly update some values
        // For now, we'll just log to console
        console.log('Dashboard auto-refresh triggered');
    }, 30000); // Every 30 seconds
}

// Initialize Charts
let timelineChart, unitChart, jabatanTopChart, jenisUjianChart, top10JabatanChart;

function initDashboardCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet, waiting...');
        setTimeout(initDashboardCharts, 500);
        return;
    }

    // 1. Timeline Pengajuan Bulanan (Line Chart)
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
        timelineChart = new Chart(timelineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
                datasets: [{
                    label: 'Pengajuan 2025',
                    data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 42],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }, {
                    label: 'Pengajuan 2024',
                    data: [8, 12, 10, 18, 15, 20, 18, 22, 20, 25, 23, 28],
                    borderColor: '#95a5a6',
                    backgroundColor: 'rgba(149, 165, 166, 0.05)',
                    tension: 0.4,
                    fill: true,
                    borderDash: [5, 5],
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10
                        }
                    }
                }
            }
        });
    }

    // 2. Top Unit Pengaju (Bar Chart - Horizontal)
    const unitCtx = document.getElementById('unitChart');
    if (unitCtx) {
        unitChart = new Chart(unitCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['BKN Pusat', 'BKN Regional I', 'BKN Regional II', 'BKN Regional III', 'BKN Regional IV'],
                datasets: [{
                    label: 'Jumlah Pengajuan',
                    data: [85, 67, 54, 48, 32],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                        'rgba(231, 76, 60, 0.8)'
                    ],
                    borderColor: [
                        '#3498db',
                        '#27ae60',
                        '#9b59b6',
                        '#f39c12',
                        '#e74c3c'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // 3. Top Jabatan Diminati (Doughnut Chart)
    const jabatanTopCtx = document.getElementById('jabatanTopChart');
    if (jabatanTopCtx) {
        jabatanTopChart = new Chart(jabatanTopCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Pranata Komputer', 'Analis SDM', 'Auditor', 'Analis Kebijakan', 'Lainnya'],
                datasets: [{
                    data: [45, 30, 25, 18, 38],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                        'rgba(149, 165, 166, 0.8)'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 10,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 4. Jenis Ujian PJ vs KJ (Pie Chart)
    const jenisUjianCtx = document.getElementById('jenisUjianChart');
    if (jenisUjianCtx) {
        jenisUjianChart = new Chart(jenisUjianCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['PJ (Promosi Jabatan)', 'KJ (Kenaikan Jenjang)'],
                datasets: [{
                    data: [92, 64],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(46, 204, 113, 0.8)'
                    ],
                    borderColor: '#fff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} pengajuan (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 5. Top 10 Jabatan (Bar Chart)
    const top10JabatanCtx = document.getElementById('top10JabatanChart');
    if (top10JabatanCtx) {
        top10JabatanChart = new Chart(top10JabatanCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [
                    'Pranata Komputer',
                    'Analis SDM Aparatur',
                    'Auditor',
                    'Analis Kebijakan',
                    'Perencana',
                    'Analis Keuangan',
                    'Kepala Seksi',
                    'Arsiparis',
                    'Pranata Humas',
                    'Statistisi'
                ],
                datasets: [{
                    label: 'Total Pengajuan',
                    data: [45, 38, 32, 28, 25, 22, 20, 18, 15, 13],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: '#3498db',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    autoRefreshDashboard();

    // Initialize charts after a small delay to ensure Chart.js is loaded
    setTimeout(initDashboardCharts, 300);
});

// Export data function (for future use)
function exportDashboardData() {
    const dataToExport = {
        timestamp: new Date().toISOString(),
        ...dashboardData
    };

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard-data-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();

    URL.revokeObjectURL(url);
}

// Print dashboard function
function printDashboard() {
    window.print();
}
