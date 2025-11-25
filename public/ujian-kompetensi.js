// Dummy Data untuk Pengajuan Ujian Kompetensi
const ujianData = [
    { nama: "Ahmad Rizki Ramadhan", nip: "199001152015031001", jabatan: "Pranata Komputer", tanggal: "2025-11-01", status: "Selesai", skor: 87 },
    { nama: "Siti Nurhaliza", nip: "199205102016042002", jabatan: "Analis SDM Aparatur", tanggal: "2025-11-02", status: "Selesai", skor: 92 },
    { nama: "Budi Santoso", nip: "198812202014031003", jabatan: "Kepala Bidang Mutasi", tanggal: "2025-11-03", status: "Penilaian", skor: null },
    { nama: "Dewi Kartika Sari", nip: "199103152015042001", jabatan: "Analis Kebijakan", tanggal: "2025-11-03", status: "Selesai", skor: 78 },
    { nama: "Eko Prasetyo", nip: "198907252013031002", jabatan: "Auditor", tanggal: "2025-11-04", status: "Ujian", skor: null },
    { nama: "Fitri Handayani", nip: "199204102016042003", jabatan: "Perencana", tanggal: "2025-11-05", status: "Verifikasi", skor: null },
    { nama: "Gunawan Wibowo", nip: "198810152014031004", jabatan: "Analis Keuangan", tanggal: "2025-11-05", status: "Selesai", skor: 85 },
    { nama: "Hesti Rahmawati", nip: "199106202015042002", jabatan: "Pranata Komputer", tanggal: "2025-11-06", status: "Ujian", skor: null },
    { nama: "Indra Kusuma", nip: "198909102013031003", jabatan: "Kepala Seksi", tanggal: "2025-11-07", status: "Penilaian", skor: null },
    { nama: "Joko Widodo", nip: "199001252015031005", jabatan: "Analis SDM Aparatur", tanggal: "2025-11-08", status: "Verifikasi", skor: null },
    { nama: "Kartini Putri", nip: "199205152016042004", jabatan: "Pengelola Kepegawaian", tanggal: "2025-11-09", status: "Pendaftaran", skor: null },
    { nama: "Linda Wijaya", nip: "198812102014042001", jabatan: "Arsiparis", tanggal: "2025-11-10", status: "Selesai", skor: 81 },
    { nama: "Muhammad Iqbal", nip: "199103202015031006", jabatan: "Pranata Humas", tanggal: "2025-11-11", status: "Ujian", skor: null },
    { nama: "Nur Azizah", nip: "199204252016042005", jabatan: "Statistisi", tanggal: "2025-11-12", status: "Verifikasi", skor: null },
    { nama: "Oki Setiawan", nip: "198907152013031004", jabatan: "Pranata Komputer", tanggal: "2025-11-13", status: "Pendaftaran", skor: null },
    { nama: "Putri Amelia", nip: "199106102015042003", jabatan: "Analis Kebijakan", tanggal: "2025-11-14", status: "Selesai", skor: 76 },
    { nama: "Raden Mas Ahmad", nip: "198810252014031005", jabatan: "Auditor", tanggal: "2025-11-15", status: "Penilaian", skor: null },
    { nama: "Sari Indah Lestari", nip: "199001102015042001", jabatan: "Perencana", tanggal: "2025-11-16", status: "Ujian", skor: null },
    { nama: "Tono Sugiarto", nip: "199205202016031001", jabatan: "Kepala Subbagian", tanggal: "2025-11-17", status: "Verifikasi", skor: null },
    { nama: "Umar Bakri", nip: "198812152014031006", jabatan: "Analis Keuangan", tanggal: "2025-11-18", status: "Selesai", skor: 89 }
];

// Generate more dummy data
for (let i = 21; i <= 100; i++) {
    const statuses = ["Pendaftaran", "Verifikasi", "Ujian", "Penilaian", "Selesai"];
    const jabatans = ["Pranata Komputer", "Analis SDM Aparatur", "Auditor", "Perencana", "Analis Keuangan", "Kepala Seksi"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    ujianData.push({
        nama: `Peserta ${i}`,
        nip: `19900${String(i).padStart(2, '0')}${i % 12 + 1}201503${i % 9 + 1}00${i % 9 + 1}`,
        jabatan: jabatans[Math.floor(Math.random() * jabatans.length)],
        tanggal: `2025-11-${String((i % 30) + 1).padStart(2, '0')}`,
        status: status,
        skor: status === "Selesai" ? Math.floor(Math.random() * 30) + 70 : null
    });
}

// Statistics
const stats = {
    total: ujianData.length,
    pendaftaran: ujianData.filter(u => u.status === "Pendaftaran").length,
    verifikasi: ujianData.filter(u => u.status === "Verifikasi").length,
    ujian: ujianData.filter(u => u.status === "Ujian").length,
    penilaian: ujianData.filter(u => u.status === "Penilaian").length,
    selesai: ujianData.filter(u => u.status === "Selesai").length
};

// Calculate results
const hasilSelesai = ujianData.filter(u => u.status === "Selesai" && u.skor !== null);
const lulus = hasilSelesai.filter(u => u.skor >= 75).length;
const tidakLulus = hasilSelesai.filter(u => u.skor < 75).length;

let progressChart, jabatanChart, hasilChart;

// Initialize Charts
function initCharts() {
    // Progress Chart
    const progCtx = document.getElementById('progressChart').getContext('2d');
    progressChart = new Chart(progCtx, {
        type: 'bar',
        data: {
            labels: ['Pendaftaran', 'Verifikasi', 'Sedang Ujian', 'Penilaian', 'Selesai'],
            datasets: [{
                label: 'Jumlah Peserta',
                data: [stats.pendaftaran, stats.verifikasi, stats.ujian, stats.penilaian, stats.selesai],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(46, 204, 113, 0.7)'
                ],
                borderColor: [
                    '#3498db',
                    '#f39c12',
                    '#9b59b6',
                    '#e67e22',
                    '#27ae60'
                ],
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

    // Jabatan Pie Chart
    const jabatanCount = ujianData.reduce((acc, curr) => {
        acc[curr.jabatan] = (acc[curr.jabatan] || 0) + 1;
        return acc;
    }, {});

    const jabCtx = document.getElementById('jabatanPieChart').getContext('2d');
    jabatanChart = new Chart(jabCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(jabatanCount),
            datasets: [{
                data: Object.values(jabatanCount),
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(52, 73, 94, 0.8)'
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
                    padding: 12
                }
            }
        }
    });

    // Hasil Chart
    const hasilCtx = document.getElementById('hasilChart').getContext('2d');
    hasilChart = new Chart(hasilCtx, {
        type: 'doughnut',
        data: {
            labels: ['Lulus', 'Tidak Lulus', 'Belum Selesai'],
            datasets: [{
                data: [lulus, tidakLulus, stats.total - hasilSelesai.length],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(189, 195, 199, 0.8)'
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
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update progress bars
function updateProgressBars() {
    const total = stats.total;

    setTimeout(() => {
        document.getElementById('barPendaftaran').style.width = ((stats.pendaftaran / total) * 100) + '%';
        document.getElementById('barVerifikasi').style.width = ((stats.verifikasi / total) * 100) + '%';
        document.getElementById('barUjian').style.width = ((stats.ujian / total) * 100) + '%';
        document.getElementById('barPenilaian').style.width = ((stats.penilaian / total) * 100) + '%';
        document.getElementById('barSelesai').style.width = ((stats.selesai / total) * 100) + '%';
    }, 100);
}

// Populate Table
let currentPage = 1;
const itemsPerPage = 15;
let filteredData = [...ujianData];

function populateTable(data = filteredData) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    pageData.forEach((item, index) => {
        let statusClass = '';
        let statusText = item.status;

        switch(item.status) {
            case 'Pendaftaran':
                statusClass = 'status-badge' + ' ' + 'status-info';
                break;
            case 'Verifikasi':
                statusClass = 'status-badge' + ' ' + 'status-warning';
                break;
            case 'Ujian':
                statusClass = 'status-badge' + ' ' + 'status-purple';
                break;
            case 'Penilaian':
                statusClass = 'status-badge' + ' ' + 'status-orange';
                break;
            case 'Selesai':
                statusClass = 'status-badge' + ' ' + 'status-normal';
                break;
        }

        const skorDisplay = item.skor !== null ?
            `<span style="font-weight: bold; color: ${item.skor >= 75 ? '#27ae60' : '#e74c3c'}">${item.skor}</span>` :
            '<span style="color: #95a5a6;">-</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td><strong>${item.nama}</strong></td>
            <td>${item.nip}</td>
            <td>${item.jabatan}</td>
            <td>${item.tanggal}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>${skorDisplay}</td>
            <td><button class="btn-action" onclick="viewDetail('${item.nama}')">Detail</button></td>
        `;
        tableBody.appendChild(row);
    });

    updatePageInfo(data);
}

// Filter by status
function filterByStatus() {
    const status = document.getElementById('filterStatus').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    filteredData = ujianData.filter(item => {
        const matchesStatus = status === 'all' || item.status === status;
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm) ||
                            item.jabatan.toLowerCase().includes(searchTerm) ||
                            item.nip.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    currentPage = 1;
    populateTable(filteredData);
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterByStatus);
    }
});

// Pagination
function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        populateTable(filteredData);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        populateTable(filteredData);
    }
}

function updatePageInfo(data = filteredData) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Halaman ${currentPage} dari ${totalPages}`;
}

// Export function
function exportData() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,Nama Peserta,NIP,Jabatan Tujuan,Tanggal Daftar,Status,Skor\n";

    filteredData.forEach((item, index) => {
        csvContent += `${index + 1},${item.nama},${item.nip},${item.jabatan},${item.tanggal},${item.status},${item.skor || '-'}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pengajuan-ujian-kompetensi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function viewDetail(nama) {
    alert(`Detail untuk: ${nama}\n\nFitur detail akan segera hadir.`);
}

// Multi-Step Form Functions
let currentStep = 1;
const totalSteps = 3;

function openPengajuanModal() {
    document.getElementById('pengajuanModal').style.display = 'flex';
    currentStep = 1;
    updateStepperUI();
    resetForm();
}

function closePengajuanModal() {
    document.getElementById('pengajuanModal').style.display = 'none';
    resetForm();
}

function resetForm() {
    // Reset all form inputs
    document.getElementById('nip').value = '';
    document.getElementById('namaLengkap').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telepon').value = '';
    document.getElementById('jabatanSekarang').value = '';
    document.getElementById('unitKerja').value = '';
    document.getElementById('jabatanTujuan').value = '';
    document.getElementById('kategoriJabatan').value = '';
    document.getElementById('skJabatan').value = '';
    document.getElementById('ijazah').value = '';
    document.getElementById('sertifikat').value = '';
    document.getElementById('dokumenLain').value = '';
    document.getElementById('pernyataan').checked = false;
}

function nextStep() {
    // Validate current step
    if (!validateStep(currentStep)) {
        alert('Mohon lengkapi semua field yang wajib diisi!');
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepperUI();

        // If moving to step 3 (verification), populate verification data
        if (currentStep === 3) {
            populateVerificationData();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepperUI();
    }
}

function updateStepperUI() {
    // Update stepper items
    document.querySelectorAll('.stepper-item').forEach((item, index) => {
        const stepNum = index + 1;
        if (stepNum < currentStep) {
            item.classList.add('completed');
            item.classList.remove('active');
        } else if (stepNum === currentStep) {
            item.classList.add('active');
            item.classList.remove('completed');
        } else {
            item.classList.remove('active', 'completed');
        }
    });

    // Update form steps
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update buttons
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSubmit = document.getElementById('btnSubmit');

    btnPrev.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    btnNext.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    btnSubmit.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
}

function validateStep(step) {
    if (step === 1) {
        const nip = document.getElementById('nip').value;
        const nama = document.getElementById('namaLengkap').value;
        const email = document.getElementById('email').value;
        const telepon = document.getElementById('telepon').value;
        const jabatan = document.getElementById('jabatanSekarang').value;
        const unit = document.getElementById('unitKerja').value;

        return nip && nama && email && telepon && jabatan && unit;
    } else if (step === 2) {
        const jabatanTujuan = document.getElementById('jabatanTujuan').value;
        const kategori = document.getElementById('kategoriJabatan').value;
        const sk = document.getElementById('skJabatan').files.length > 0;
        const ijazah = document.getElementById('ijazah').files.length > 0;

        return jabatanTujuan && kategori && sk && ijazah;
    }
    return true;
}

function populateVerificationData() {
    // Data Peserta
    document.getElementById('verify-nip').textContent = document.getElementById('nip').value;
    document.getElementById('verify-nama').textContent = document.getElementById('namaLengkap').value;
    document.getElementById('verify-email').textContent = document.getElementById('email').value;
    document.getElementById('verify-telepon').textContent = document.getElementById('telepon').value;
    document.getElementById('verify-jabatan-sekarang').textContent = document.getElementById('jabatanSekarang').value;
    document.getElementById('verify-unit').textContent = document.getElementById('unitKerja').value;

    // Jabatan & Dokumen
    document.getElementById('verify-jabatan-tujuan').textContent = document.getElementById('jabatanTujuan').value;
    document.getElementById('verify-kategori').textContent = document.getElementById('kategoriJabatan').value;

    const skFile = document.getElementById('skJabatan').files[0];
    document.getElementById('verify-sk').textContent = skFile ? skFile.name : '-';

    const ijazahFile = document.getElementById('ijazah').files[0];
    document.getElementById('verify-ijazah').textContent = ijazahFile ? ijazahFile.name : '-';

    const sertifikatFile = document.getElementById('sertifikat').files[0];
    document.getElementById('verify-sertifikat').textContent = sertifikatFile ? sertifikatFile.name : 'Tidak ada';
}

function submitPengajuan() {
    // Check pernyataan checkbox
    if (!document.getElementById('pernyataan').checked) {
        alert('Mohon centang pernyataan untuk melanjutkan!');
        return;
    }

    // Get form data
    const formData = {
        nip: document.getElementById('nip').value,
        nama: document.getElementById('namaLengkap').value,
        email: document.getElementById('email').value,
        telepon: document.getElementById('telepon').value,
        jabatanSekarang: document.getElementById('jabatanSekarang').value,
        unitKerja: document.getElementById('unitKerja').value,
        jabatanTujuan: document.getElementById('jabatanTujuan').value,
        kategori: document.getElementById('kategoriJabatan').value,
        tanggal: new Date().toISOString().split('T')[0],
        status: 'Pendaftaran',
        skor: null
    };

    // Add to data array
    ujianData.unshift(formData);

    // Update stats
    stats.total++;
    stats.pendaftaran++;

    // Refresh charts and table
    if (progressChart) progressChart.destroy();
    if (jabatanChart) jabatanChart.destroy();
    if (hasilChart) hasilChart.destroy();

    initCharts();
    updateProgressBars();
    filteredData = [...ujianData];
    currentPage = 1;
    populateTable();

    // Close modal and show success
    closePengajuanModal();
    alert('✓ Pengajuan ujian kompetensi berhasil disubmit!\n\nData akan diverifikasi oleh tim dalam 2-3 hari kerja.\nNotifikasi akan dikirim via email: ' + formData.email);
}

// Verification Modal Functions
let selectedPesertaIndex = null;

function openVerifikasiModal(index) {
    selectedPesertaIndex = index;
    const peserta = ujianData[index];

    // Populate modal data
    document.getElementById('verif-nama-peserta').textContent = peserta.nama;
    document.getElementById('verif-nip').textContent = peserta.nip;
    document.getElementById('verif-jabatan').textContent = peserta.jabatan;
    document.getElementById('verif-tanggal').textContent = peserta.tanggal;
    document.getElementById('verif-status-current').textContent = peserta.status;

    // Show modal
    document.getElementById('verifikasiModal').style.display = 'flex';
}

function closeVerifikasiModal() {
    document.getElementById('verifikasiModal').style.display = 'none';
    document.getElementById('statusBaru').value = '';
    document.getElementById('catatanVerifikasi').value = '';
    selectedPesertaIndex = null;
}

function prosesVerifikasi() {
    const statusBaru = document.getElementById('statusBaru').value;
    const catatan = document.getElementById('catatanVerifikasi').value;

    if (!statusBaru) {
        alert('Mohon pilih status selanjutnya!');
        return;
    }

    if (selectedPesertaIndex !== null) {
        const peserta = ujianData[selectedPesertaIndex];
        const statusLama = peserta.status;

        // Update status
        peserta.status = statusBaru;

        // Update stats
        stats[statusLama.toLowerCase()]--;
        if (statusBaru !== 'Ditolak') {
            stats[statusBaru.toLowerCase()]++;
        }

        // If status is Selesai, add random score
        if (statusBaru === 'Selesai') {
            peserta.skor = Math.floor(Math.random() * 30) + 70;
        }

        // Refresh charts and table
        if (progressChart) progressChart.destroy();
        if (jabatanChart) jabatanChart.destroy();
        if (hasilChart) hasilChart.destroy();

        initCharts();
        updateProgressBars();
        populateTable();

        // Close modal and show success
        closeVerifikasiModal();
        alert(`✓ Verifikasi berhasil!\n\nPeserta: ${peserta.nama}\nStatus diubah dari "${statusLama}" menjadi "${statusBaru}"\n\nCatatan: ${catatan || 'Tidak ada catatan'}`);
    }
}

// Update viewDetail function to open verification modal
function viewDetail(nama) {
    const index = ujianData.findIndex(item => item.nama === nama);
    if (index !== -1) {
        openVerifikasiModal(index);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const pengajuanModal = document.getElementById('pengajuanModal');
    const verifikasiModal = document.getElementById('verifikasiModal');

    if (event.target === pengajuanModal) {
        closePengajuanModal();
    }
    if (event.target === verifikasiModal) {
        closeVerifikasiModal();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart !== 'undefined') {
        initCharts();
        updateProgressBars();
        populateTable();
    } else {
        setTimeout(function() {
            if (typeof Chart !== 'undefined') {
                initCharts();
                updateProgressBars();
                populateTable();
            }
        }, 1000);
    }
});
