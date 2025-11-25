// Dummy Data untuk Jabatan ASN
const jabatanData = [
    { nama: "Pranata Komputer", kategori: "Fungsional", dibutuhkan: 45, terisi: 38, kosong: 7 },
    { nama: "Analis SDM Aparatur", kategori: "Fungsional", dibutuhkan: 30, terisi: 28, kosong: 2 },
    { nama: "Pengelola Kepegawaian", kategori: "Pelaksana", dibutuhkan: 25, terisi: 22, kosong: 3 },
    { nama: "Analis Kebijakan", kategori: "Fungsional", dibutuhkan: 20, terisi: 18, kosong: 2 },
    { nama: "Auditor", kategori: "Fungsional", dibutuhkan: 35, terisi: 32, kosong: 3 },
    { nama: "Pengawas Penyelenggaraan Urusan", kategori: "Fungsional", dibutuhkan: 18, terisi: 15, kosong: 3 },
    { nama: "Perencana", kategori: "Fungsional", dibutuhkan: 22, terisi: 20, kosong: 2 },
    { nama: "Analis Keuangan", kategori: "Fungsional", dibutuhkan: 28, terisi: 25, kosong: 3 },
    { nama: "Pengelola Pengadaan Barang/Jasa", kategori: "Pelaksana", dibutuhkan: 15, terisi: 12, kosong: 3 },
    { nama: "Arsiparis", kategori: "Fungsional", dibutuhkan: 12, terisi: 10, kosong: 2 },
    { nama: "Pranata Humas", kategori: "Fungsional", dibutuhkan: 16, terisi: 14, kosong: 2 },
    { nama: "Pengelola Data dan Informasi", kategori: "Pelaksana", dibutuhkan: 20, terisi: 16, kosong: 4 },
    { nama: "Kepala Seksi", kategori: "Struktural", dibutuhkan: 32, terisi: 30, kosong: 2 },
    { nama: "Kepala Bidang", kategori: "Struktural", dibutuhkan: 18, terisi: 16, kosong: 2 },
    { nama: "Kepala Subbagian", kategori: "Struktural", dibutuhkan: 24, terisi: 22, kosong: 2 },
    { nama: "Analis Pengelolaan Keuangan APBN", kategori: "Fungsional", dibutuhkan: 14, terisi: 8, kosong: 6 },
    { nama: "Statistisi", kategori: "Fungsional", dibutuhkan: 10, terisi: 7, kosong: 3 },
    { nama: "Analis Pemetaan Jabatan", kategori: "Fungsional", dibutuhkan: 6, terisi: 3, kosong: 3 }
];

// Calculate totals
const totalData = jabatanData.reduce((acc, curr) => {
    acc.dibutuhkan += curr.dibutuhkan;
    acc.terisi += curr.terisi;
    acc.kosong += curr.kosong;
    return acc;
}, { dibutuhkan: 0, terisi: 0, kosong: 0 });

// Chart configurations
let barChart, pieChart, doughnutChart;

// Initialize Charts
function initCharts() {
    // Bar Chart - Breakdown Jabatan
    const barCtx = document.getElementById('jabatanBarChart').getContext('2d');
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: jabatanData.map(j => j.nama),
            datasets: [
                {
                    label: 'Dibutuhkan',
                    data: jabatanData.map(j => j.dibutuhkan),
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: '#3498db',
                    borderWidth: 1
                },
                {
                    label: 'Terisi',
                    data: jabatanData.map(j => j.terisi),
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: '#27ae60',
                    borderWidth: 1
                },
                {
                    label: 'Kosong',
                    data: jabatanData.map(j => j.kosong),
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: '#e74c3c',
                    borderWidth: 1
                }
            ]
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
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });

    // Pie Chart - Kategori Jabatan
    const kategoriCount = jabatanData.reduce((acc, curr) => {
        acc[curr.kategori] = (acc[curr.kategori] || 0) + curr.dibutuhkan;
        return acc;
    }, {});

    const pieCtx = document.getElementById('kategoriPieChart').getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(kategoriCount),
            datasets: [{
                data: Object.values(kategoriCount),
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(155, 89, 182, 0.8)'
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
                        padding: 15,
                        font: {
                            size: 12
                        }
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

    // Doughnut Chart - Tingkat Pengisian
    const doughnutCtx = document.getElementById('pengisianDoughnutChart').getContext('2d');
    doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Terisi', 'Kosong'],
            datasets: [{
                data: [totalData.terisi, totalData.kosong],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
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
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = totalData.dibutuhkan;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} dari ${total} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Populate Table
function populateTable(data = jabatanData) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const persenTerisi = ((item.terisi / item.dibutuhkan) * 100).toFixed(1);
        let status = 'Normal';
        let statusClass = 'status-normal';

        if (persenTerisi < 50) {
            status = 'Kritis';
            statusClass = 'status-critical';
        } else if (persenTerisi < 80) {
            status = 'Perhatian';
            statusClass = 'status-warning';
        }

        const progressClass = persenTerisi >= 80 ? 'progress-high' : persenTerisi >= 50 ? 'progress-medium' : 'progress-low';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.nama}</strong></td>
            <td>${item.kategori}</td>
            <td>${item.dibutuhkan}</td>
            <td>${item.terisi}</td>
            <td>${item.kosong}</td>
            <td>
                <div>${persenTerisi}%</div>
                <div class="progress-mini">
                    <div class="progress-mini-fill ${progressClass}" style="width: ${persenTerisi}%"></div>
                </div>
            </td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td><button class="btn-action" onclick="viewDetail('${item.nama}')">Detail</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = jabatanData.filter(item =>
                item.nama.toLowerCase().includes(searchTerm) ||
                item.kategori.toLowerCase().includes(searchTerm)
            );
            populateTable(filteredData);
        });
    }
});

// Filter function
function applyFilter() {
    const filterType = document.getElementById('filterType').value;
    const filterStatus = document.getElementById('filterStatus').value;

    let filteredData = jabatanData;

    // Filter by category
    if (filterType !== 'all') {
        filteredData = filteredData.filter(item =>
            item.kategori.toLowerCase() === filterType.toLowerCase()
        );
    }

    // Filter by status
    if (filterStatus !== 'all') {
        filteredData = filteredData.filter(item => {
            const persenTerisi = (item.terisi / item.dibutuhkan) * 100;
            if (filterStatus === 'kosong') {
                return item.kosong > 0;
            } else if (filterStatus === 'terisi') {
                return item.kosong === 0;
            } else if (filterStatus === 'kritis') {
                return persenTerisi < 50;
            }
            return true;
        });
    }

    populateTable(filteredData);
}

// Export to Excel
function exportData() {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,Nama Jabatan,Kategori,Dibutuhkan,Terisi,Kosong,Persentase Terisi\n";

    jabatanData.forEach((item, index) => {
        const persenTerisi = ((item.terisi / item.dibutuhkan) * 100).toFixed(1);
        csvContent += `${index + 1},${item.nama},${item.kategori},${item.dibutuhkan},${item.terisi},${item.kosong},${persenTerisi}%\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data-jabatan-asn.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// View detail function
function viewDetail(namaJabatan) {
    alert(`Menampilkan detail untuk: ${namaJabatan}\n\nFitur detail akan segera hadir.`);
}

// Pagination variables
let currentPage = 1;
const itemsPerPage = 10;

function nextPage() {
    const totalPages = Math.ceil(jabatanData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updatePageInfo();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePageInfo();
    }
}

function updatePageInfo() {
    const totalPages = Math.ceil(jabatanData.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Halaman ${currentPage} dari ${totalPages}`;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Chart.js to load
    if (typeof Chart !== 'undefined') {
        initCharts();
        populateTable();
        updatePageInfo();
    } else {
        console.error('Chart.js belum ter-load');
        // Try again after a short delay
        setTimeout(function() {
            if (typeof Chart !== 'undefined') {
                initCharts();
                populateTable();
                updatePageInfo();
            } else {
                alert('Gagal memuat Chart.js. Silakan refresh halaman.');
            }
        }, 1000);
    }
});
