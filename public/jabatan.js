// Data Jabatan
let jabatanData = [
    { id: 1, nama: "Pranata Komputer", kategori: "Fungsional", dibutuhkan: 45, terisi: 38, status: "aktif" },
    { id: 2, nama: "Analis SDM Aparatur", kategori: "Fungsional", dibutuhkan: 30, terisi: 28, status: "aktif" },
    { id: 3, nama: "Pengelola Kepegawaian", kategori: "Pelaksana", dibutuhkan: 25, terisi: 22, status: "aktif" },
    { id: 4, nama: "Analis Kebijakan", kategori: "Fungsional", dibutuhkan: 20, terisi: 18, status: "aktif" },
    { id: 5, nama: "Auditor", kategori: "Fungsional", dibutuhkan: 35, terisi: 32, status: "aktif" },
    { id: 6, nama: "Pengawas Penyelenggaraan Urusan", kategori: "Fungsional", dibutuhkan: 18, terisi: 15, status: "aktif" },
    { id: 7, nama: "Perencana", kategori: "Fungsional", dibutuhkan: 22, terisi: 20, status: "aktif" },
    { id: 8, nama: "Analis Keuangan", kategori: "Fungsional", dibutuhkan: 28, terisi: 25, status: "aktif" },
    { id: 9, nama: "Pengelola Pengadaan Barang/Jasa", kategori: "Pelaksana", dibutuhkan: 15, terisi: 12, status: "aktif" },
    { id: 10, nama: "Arsiparis", kategori: "Fungsional", dibutuhkan: 12, terisi: 10, status: "aktif" },
    { id: 11, nama: "Pranata Humas", kategori: "Fungsional", dibutuhkan: 16, terisi: 14, status: "aktif" },
    { id: 12, nama: "Pengelola Data dan Informasi", kategori: "Pelaksana", dibutuhkan: 20, terisi: 16, status: "aktif" },
    { id: 13, nama: "Kepala Seksi", kategori: "Struktural", dibutuhkan: 32, terisi: 30, status: "aktif" },
    { id: 14, nama: "Kepala Bidang", kategori: "Struktural", dibutuhkan: 18, terisi: 16, status: "aktif" },
    { id: 15, nama: "Kepala Subbagian", kategori: "Struktural", dibutuhkan: 24, terisi: 22, status: "aktif" },
    { id: 16, nama: "Analis Pengelolaan Keuangan APBN", kategori: "Fungsional", dibutuhkan: 14, terisi: 8, status: "non-aktif" },
    { id: 17, nama: "Statistisi", kategori: "Fungsional", dibutuhkan: 10, terisi: 7, status: "non-aktif" },
    { id: 18, nama: "Analis Pemetaan Jabatan", kategori: "Fungsional", dibutuhkan: 6, terisi: 3, status: "non-aktif" }
];

// Pagination & Filter State
let currentPage = 1;
const itemsPerPage = 9;
let filteredData = [...jabatanData];
let currentView = 'grid';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateSummary();
    renderJabatan();
    setupSearch();
});

// Update Summary Cards
function updateSummary() {
    const aktif = jabatanData.filter(j => j.status === 'aktif').length;
    const nonAktif = jabatanData.filter(j => j.status === 'non-aktif').length;

    document.getElementById('totalJabatanCount').textContent = jabatanData.length;
    document.getElementById('jabatanAktif').textContent = aktif;
    document.getElementById('jabatanNonAktif').textContent = nonAktif;
}

// Render Jabatan
function renderJabatan() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    if (currentView === 'grid') {
        renderGridView(pageData);
    } else {
        renderListView(pageData);
    }

    updatePagination();
}

// Render Grid View
function renderGridView(data) {
    const grid = document.getElementById('jabatanGrid');
    grid.innerHTML = '';

    data.forEach(item => {
        const kosong = item.dibutuhkan - item.terisi;
        const persenTerisi = ((item.terisi / item.dibutuhkan) * 100).toFixed(1);

        const card = document.createElement('div');
        card.className = 'jabatan-card';
        card.innerHTML = `
            <div class="jabatan-card-header">
                <div class="jabatan-card-title">
                    <h3>${item.nama}</h3>
                    <span class="jabatan-kategori">${item.kategori}</span>
                </div>
                <span class="jabatan-status status-${item.status}">${item.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}</span>
            </div>

            <div class="jabatan-stats">
                <div class="stat-box">
                    <div class="stat-box-label">Dibutuhkan</div>
                    <div class="stat-box-value stat-dibutuhkan">${item.dibutuhkan}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Terisi</div>
                    <div class="stat-box-value stat-terisi">${item.terisi}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Kosong</div>
                    <div class="stat-box-value stat-kosong">${kosong}</div>
                </div>
            </div>

            <div class="jabatan-progress">
                <div class="progress-label-small">
                    <span>Pengisian</span>
                    <strong>${persenTerisi}%</strong>
                </div>
                <div class="progress-bar-small">
                    <div class="progress-fill-small" style="width: ${persenTerisi}%"></div>
                </div>
            </div>

            <div class="jabatan-actions">
                <button class="btn-action-card btn-edit" onclick="editJabatan(${item.id})">✏️ Edit</button>
                <button class="btn-action-card btn-delete" onclick="deleteJabatan(${item.id})">🗑️ Hapus</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render List View
function renderListView(data) {
    const tbody = document.getElementById('jabatanTableBody');
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;

    data.forEach((item, index) => {
        const kosong = item.dibutuhkan - item.terisi;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td><strong>${item.nama}</strong></td>
            <td><span class="jabatan-kategori">${item.kategori}</span></td>
            <td>${item.dibutuhkan}</td>
            <td>${item.terisi}</td>
            <td>${kosong}</td>
            <td><span class="jabatan-status status-${item.status}">${item.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}</span></td>
            <td>
                <button class="btn-action" onclick="editJabatan(${item.id})">Edit</button>
                <button class="btn-action" style="background: #e74c3c; margin-left: 5px;" onclick="deleteJabatan(${item.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Switch View
function switchView(view) {
    currentView = view;

    const gridView = document.getElementById('jabatanGrid');
    const listView = document.getElementById('jabatanList');
    const btnGrid = document.getElementById('btnGrid');
    const btnList = document.getElementById('btnList');

    if (view === 'grid') {
        gridView.style.display = 'grid';
        listView.style.display = 'none';
        btnGrid.classList.add('active');
        btnList.classList.remove('active');
    } else {
        gridView.style.display = 'none';
        listView.style.display = 'block';
        btnGrid.classList.remove('active');
        btnList.classList.add('active');
    }

    renderJabatan();
}

// Search
function setupSearch() {
    const searchInput = document.getElementById('searchJabatan');
    searchInput.addEventListener('input', function(e) {
        applyFilters();
    });
}

// Apply Filters
function applyFilters() {
    const searchTerm = document.getElementById('searchJabatan').value.toLowerCase();
    const kategori = document.getElementById('filterKategori').value;
    const status = document.getElementById('filterStatus').value;

    filteredData = jabatanData.filter(item => {
        const matchSearch = item.nama.toLowerCase().includes(searchTerm);
        const matchKategori = kategori === 'all' || item.kategori === kategori;
        const matchStatus = status === 'all' || item.status === status;
        return matchSearch && matchKategori && matchStatus;
    });

    currentPage = 1;
    renderJabatan();
}

// Reset Filters
function resetFilters() {
    document.getElementById('searchJabatan').value = '';
    document.getElementById('filterKategori').value = 'all';
    document.getElementById('filterStatus').value = 'all';
    filteredData = [...jabatanData];
    currentPage = 1;
    renderJabatan();
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredData.length);

    document.getElementById('showingStart').textContent = filteredData.length > 0 ? startIndex : 0;
    document.getElementById('showingEnd').textContent = endIndex;
    document.getElementById('totalItems').textContent = filteredData.length;

    // Render page numbers
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.className = 'page-num' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderJabatan();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderJabatan();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToPage(page) {
    currentPage = page;
    renderJabatan();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal Functions
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Tambah Jabatan Baru';
    document.getElementById('jabatanForm').reset();
    document.getElementById('jabatanModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('jabatanModal').style.display = 'none';
}

function editJabatan(id) {
    const jabatan = jabatanData.find(j => j.id === id);
    if (!jabatan) return;

    document.getElementById('modalTitle').textContent = 'Edit Jabatan';
    document.getElementById('namaJabatan').value = jabatan.nama;
    document.getElementById('kategoriJabatan').value = jabatan.kategori;
    document.getElementById('statusJabatan').value = jabatan.status;
    document.getElementById('jumlahDibutuhkan').value = jabatan.dibutuhkan;
    document.getElementById('jumlahTerisi').value = jabatan.terisi;

    document.getElementById('jabatanModal').style.display = 'block';
}

function saveJabatan() {
    const nama = document.getElementById('namaJabatan').value;
    const kategori = document.getElementById('kategoriJabatan').value;
    const status = document.getElementById('statusJabatan').value;
    const dibutuhkan = parseInt(document.getElementById('jumlahDibutuhkan').value);
    const terisi = parseInt(document.getElementById('jumlahTerisi').value) || 0;

    if (!nama || !kategori || !dibutuhkan) {
        alert('Mohon lengkapi semua field yang wajib diisi!');
        return;
    }

    // Add new jabatan
    const newId = Math.max(...jabatanData.map(j => j.id)) + 1;
    jabatanData.push({
        id: newId,
        nama: nama,
        kategori: kategori,
        dibutuhkan: dibutuhkan,
        terisi: terisi,
        status: status
    });

    closeModal();
    updateSummary();
    resetFilters();
    alert('Jabatan berhasil ditambahkan!');
}

function deleteJabatan(id) {
    const jabatan = jabatanData.find(j => j.id === id);
    if (!jabatan) return;

    if (confirm(`Apakah Anda yakin ingin menghapus jabatan "${jabatan.nama}"?`)) {
        jabatanData = jabatanData.filter(j => j.id !== id);
        updateSummary();
        applyFilters();
        alert('Jabatan berhasil dihapus!');
    }
}

// Export Functions
function exportData() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,Nama Jabatan,Kategori,Dibutuhkan,Terisi,Kosong,Status\n";

    filteredData.forEach((item, index) => {
        const kosong = item.dibutuhkan - item.terisi;
        csvContent += `${index + 1},${item.nama},${item.kategori},${item.dibutuhkan},${item.terisi},${kosong},${item.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data-jabatan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printData() {
    window.print();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('jabatanModal');
    if (event.target === modal) {
        closeModal();
    }
}
