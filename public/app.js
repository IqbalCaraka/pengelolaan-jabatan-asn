// Main App Router
class App {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        // Setup navigation
        this.setupNavigation();

        // Load initial page
        const hash = window.location.hash.slice(1) || 'dashboard';
        this.loadPage(hash);

        // Handle browser back/forward
        window.addEventListener('hashchange', () => {
            const page = window.location.hash.slice(1) || 'dashboard';
            this.loadPage(page);
        });
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    }

    navigateTo(page) {
        window.location.hash = page;
    }

    async loadPage(page) {
        // Show loading
        this.showLoading();

        // Update active nav
        this.updateActiveNav(page);

        // Load content based on page
        try {
            await this.renderPage(page);
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError();
        }

        // Hide loading
        this.hideLoading();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async renderPage(page) {
        const mainContent = document.getElementById('mainContent');

        switch(page) {
            case 'dashboard':
                mainContent.innerHTML = this.getDashboardHTML();
                this.initDashboard();
                break;
            case 'jabatan':
                mainContent.innerHTML = this.getJabatanHTML();
                this.initJabatan();
                break;
            case 'ujian':
            case 'ujian-kompetensi':
                mainContent.innerHTML = this.getUjianHTML();
                this.initUjian();
                break;
            case 'asn':
                mainContent.innerHTML = this.getASNHTML();
                this.initASN();
                break;
            case 'laporan':
                mainContent.innerHTML = this.getLaporanHTML();
                this.initLaporan();
                break;
            case 'pengaturan':
                mainContent.innerHTML = this.getPengaturanHTML();
                this.initPengaturan();
                break;
            default:
                mainContent.innerHTML = this.get404HTML();
        }
    }

    updateActiveNav(page) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === page) {
                item.classList.add('active');
            }
        });
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'flex';
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    showError() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>❌ Terjadi Kesalahan</h2>
                <p>Gagal memuat halaman. Silakan coba lagi.</p>
                <button class="btn-primary" onclick="location.reload()">Muat Ulang</button>
            </div>
        `;
    }

    getDashboardHTML() {
        return `
            <!-- Header -->
            <header class="header">
                <h1>Dashboard Pengelolaan Jabatan ASN</h1>
                <div class="user-info">
                    <span>Admin BKN</span>
                    <div class="avatar">A</div>
                </div>
            </header>

            <!-- Dashboard Cards -->
            <section class="dashboard-cards-new">
                <!-- Combined Jabatan Card -->
                <div class="card-combined" onclick="app.navigateTo('jabatan')" style="cursor: pointer;">
                    <div class="card-combined-header">
                        <div class="card-combined-title">
                            <span class="icon-large">💼</span>
                            <div>
                                <h2>Ringkasan Jabatan ASN</h2>
                                <p>Status kebutuhan dan ketersediaan jabatan</p>
                            </div>
                        </div>
                        <div class="card-link">Lihat Detail →</div>
                    </div>
                    <div class="card-combined-stats">
                        <div class="stat-item stat-primary">
                            <div class="stat-icon">📋</div>
                            <div class="stat-content">
                                <span class="stat-label">Total Dibutuhkan</span>
                                <span class="stat-number" id="totalJabatan">0</span>
                            </div>
                        </div>
                        <div class="stat-item stat-success">
                            <div class="stat-icon">✅</div>
                            <div class="stat-content">
                                <span class="stat-label">Jabatan Terisi</span>
                                <span class="stat-number" id="jabatanTerisi">0</span>
                            </div>
                        </div>
                        <div class="stat-item stat-warning">
                            <div class="stat-icon">⚠️</div>
                            <div class="stat-content">
                                <span class="stat-label">Jabatan Kosong</span>
                                <span class="stat-number" id="jabatanKosong">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-combined-footer">
                        <div class="progress-bar-combined">
                            <div class="progress-fill-combined progress-terisi" id="progressTerisi"></div>
                        </div>
                        <div class="progress-info">
                            <span id="persenTerisi">0%</span> Terisi
                        </div>
                    </div>
                </div>

                <!-- Pengajuan Ujian Card -->
                <div class="card card-info" onclick="app.navigateTo('ujian')" style="cursor: pointer;">
                    <div class="card-icon">📝</div>
                    <div class="card-content">
                        <h3>Pengajuan Ujian Kompetensi</h3>
                        <p class="card-number" id="totalPengajuan">0</p>
                        <span class="card-subtitle">Total pengajuan masuk • <strong>Lihat Detail →</strong></span>
                    </div>
                </div>
            </section>

            <!-- Progress Section -->
            <section class="progress-section">
                <div class="section-card">
                    <h2>Progress Pengajuan Ujian Kompetensi</h2>
                    <div class="progress-container">
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Pendaftaran</span>
                                <span id="progPendaftaran">0</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="barPendaftaran"></div>
                            </div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Verifikasi Dokumen</span>
                                <span id="progVerifikasi">0</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="barVerifikasi"></div>
                            </div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Sedang Ujian</span>
                                <span id="progUjian">0</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="barUjian"></div>
                            </div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Penilaian</span>
                                <span id="progPenilaian">0</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="barPenilaian"></div>
                            </div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Selesai</span>
                                <span id="progSelesai">0</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="barSelesai"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Results Section -->
            <section class="results-section-new">
                <div class="result-card-combined">
                    <div class="result-card-header">
                        <h2>📊 Hasil Ujian Kompetensi</h2>
                        <p>Statistik kelulusan peserta ujian</p>
                    </div>

                    <div class="result-stats-container">
                        <div class="result-stat-item result-stat-success">
                            <div class="result-stat-icon">🎓</div>
                            <div class="result-stat-content">
                                <span class="result-stat-label">Lulus</span>
                                <div class="result-stat-numbers">
                                    <span class="result-stat-number" id="jumlahLulus">0</span>
                                    <span class="result-stat-total">peserta</span>
                                </div>
                                <div class="result-progress-mini">
                                    <div class="result-progress-fill result-progress-success" id="progressLulus"></div>
                                </div>
                                <span class="result-stat-percent" id="persenLulus">0%</span>
                            </div>
                        </div>

                        <div class="result-divider">
                            <div class="result-vs">VS</div>
                        </div>

                        <div class="result-stat-item result-stat-danger">
                            <div class="result-stat-icon">❌</div>
                            <div class="result-stat-content">
                                <span class="result-stat-label">Tidak Lulus</span>
                                <div class="result-stat-numbers">
                                    <span class="result-stat-number" id="jumlahTidakLulus">0</span>
                                    <span class="result-stat-total">peserta</span>
                                </div>
                                <div class="result-progress-mini">
                                    <div class="result-progress-fill result-progress-danger" id="progressTidakLulus"></div>
                                </div>
                                <span class="result-stat-percent" id="persenTidakLulus">0%</span>
                            </div>
                        </div>
                    </div>

                    <div class="result-card-footer">
                        <div class="result-summary">
                            <span class="result-summary-icon">👥</span>
                            <span>Total <strong id="totalPesertaUjian">123</strong> peserta telah menyelesaikan ujian</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Recent Activity -->
            <section class="activity-section">
                <div class="section-card">
                    <h2>Aktivitas Terbaru</h2>
                    <div class="activity-list" id="activityList">
                        <!-- Activity items will be added by JavaScript -->
                    </div>
                </div>
            </section>
        `;
    }

    getJabatanHTML() {
        // Load jabatan page HTML inline
        return `
            <header class="header">
                <div>
                    <h1>Pengelolaan Jabatan</h1>
                    <p class="breadcrumb">Dashboard > Jabatan</p>
                </div>
                <div class="user-info">
                    <span>Admin BKN</span>
                    <div class="avatar">A</div>
                </div>
            </header>

            <section class="action-bar">
                <button class="btn-primary" onclick="openAddModal()">
                    <span class="btn-icon">➕</span>
                    Tambah Jabatan Baru
                </button>
                <div class="action-group">
                    <button class="btn-secondary" onclick="exportJabatanData()">
                        <span class="btn-icon">📥</span>
                        Export Excel
                    </button>
                </div>
            </section>

            <section class="summary-section">
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(52, 152, 219, 0.1); color: #3498db;">📋</div>
                    <div>
                        <h3>Total Jabatan</h3>
                        <p class="summary-number-mini" id="totalJabatanCount">18</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(46, 204, 113, 0.1); color: #27ae60;">✅</div>
                    <div>
                        <h3>Jabatan Aktif</h3>
                        <p class="summary-number-mini" id="jabatanAktif">15</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(241, 196, 15, 0.1); color: #f39c12;">⏸️</div>
                    <div>
                        <h3>Non-Aktif</h3>
                        <p class="summary-number-mini" id="jabatanNonAktif">3</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(155, 89, 182, 0.1); color: #9b59b6;">🎯</div>
                    <div>
                        <h3>Kategori</h3>
                        <p class="summary-number-mini">3</p>
                    </div>
                </div>
            </section>

            <section class="filter-search-section">
                <div class="filter-search-card">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="searchJabatan" placeholder="Cari nama jabatan..." class="search-input-main">
                    </div>
                    <div class="filter-group-inline">
                        <select id="filterKategori" class="filter-select" onchange="applyJabatanFilters()">
                            <option value="all">Semua Kategori</option>
                            <option value="Fungsional">Fungsional</option>
                            <option value="Struktural">Struktural</option>
                            <option value="Pelaksana">Pelaksana</option>
                        </select>
                        <select id="filterStatus" class="filter-select" onchange="applyJabatanFilters()">
                            <option value="all">Semua Status</option>
                            <option value="aktif">Aktif</option>
                            <option value="non-aktif">Non-Aktif</option>
                        </select>
                        <button class="btn-filter-reset" onclick="resetJabatanFilters()">Reset Filter</button>
                    </div>
                </div>
            </section>

            <section class="jabatan-list-section">
                <div class="section-header">
                    <h2>Daftar Jabatan</h2>
                </div>

                <div class="jabatan-grid" id="jabatanGrid">
                    <!-- Will be populated by JavaScript -->
                </div>

                <div class="pagination-section">
                    <div class="pagination-info">
                        Menampilkan <strong id="showingStart">1</strong> - <strong id="showingEnd">9</strong> dari <strong id="totalItems">18</strong> jabatan
                    </div>
                    <div class="pagination-controls">
                        <button class="btn-page" onclick="prevJabatanPage()">← Sebelumnya</button>
                        <div class="page-numbers" id="pageNumbers"></div>
                        <button class="btn-page" onclick="nextJabatanPage()">Berikutnya →</button>
                    </div>
                </div>
            </section>

            <!-- Modal Add/Edit Jabatan -->
            <div class="modal" id="jabatanModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modalTitle">Tambah Jabatan Baru</h2>
                        <button class="modal-close" onclick="closeJabatanModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="jabatanForm">
                            <div class="form-group">
                                <label>Nama Jabatan <span class="required">*</span></label>
                                <input type="text" id="namaJabatan" class="form-input" placeholder="Contoh: Pranata Komputer" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Kategori <span class="required">*</span></label>
                                    <select id="kategoriJabatan" class="form-input" required>
                                        <option value="">Pilih Kategori</option>
                                        <option value="Fungsional">Fungsional</option>
                                        <option value="Struktural">Struktural</option>
                                        <option value="Pelaksana">Pelaksana</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Status <span class="required">*</span></label>
                                    <select id="statusJabatan" class="form-input" required>
                                        <option value="aktif">Aktif</option>
                                        <option value="non-aktif">Non-Aktif</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Jumlah Dibutuhkan <span class="required">*</span></label>
                                    <input type="number" id="jumlahDibutuhkan" class="form-input" min="1" placeholder="0" required>
                                </div>
                                <div class="form-group">
                                    <label>Jumlah Terisi</label>
                                    <input type="number" id="jumlahTerisi" class="form-input" min="0" placeholder="0">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" onclick="closeJabatanModal()">Batal</button>
                        <button class="btn-primary" onclick="saveJabatanData()">Simpan</button>
                    </div>
                </div>
            </div>
        `;
    }

    getUjianHTML() {
        return `
            <header class="header">
                <div>
                    <h1>Pengajuan Ujian Kompetensi</h1>
                    <p class="breadcrumb">Dashboard > Ujian Kompetensi</p>
                </div>
                <div class="user-info">
                    <span>Admin BKN</span>
                    <div class="avatar">A</div>
                </div>
            </header>

            <section class="summary-section">
                <div class="summary-card">
                    <div class="summary-icon" style="background: rgba(52, 152, 219, 0.1); color: #3498db;">📝</div>
                    <div>
                        <h3>Total Pengajuan</h3>
                        <p class="summary-number" id="totalPengajuanUjian">156</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon" style="background: rgba(241, 196, 15, 0.1); color: #f39c12;">⏳</div>
                    <div>
                        <h3>Menunggu Verifikasi</h3>
                        <p class="summary-number">42</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon" style="background: rgba(155, 89, 182, 0.1); color: #9b59b6;">📋</div>
                    <div>
                        <h3>Sedang Berlangsung</h3>
                        <p class="summary-number">52</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon" style="background: rgba(46, 204, 113, 0.1); color: #27ae60;">✅</div>
                    <div>
                        <h3>Selesai</h3>
                        <p class="summary-number">27</p>
                    </div>
                </div>
            </section>

            <div style="text-align: center; padding: 50px;">
                <h3>📝 Halaman Ujian Kompetensi</h3>
                <p>Detail konten ujian kompetensi akan ditampilkan di sini</p>
            </div>
        `;
    }

    getComingSoonHTML(pageName) {
        return `
            <div style="text-align: center; padding: 100px 20px;">
                <h1 style="font-size: 48px; margin-bottom: 20px;">🚧</h1>
                <h2 style="color: #1e3c72; margin-bottom: 10px;">Halaman ${pageName}</h2>
                <p style="color: #7f8c8d; font-size: 18px;">Segera Hadir</p>
                <button class="btn-primary" onclick="app.navigateTo('dashboard')" style="margin-top: 30px;">
                    Kembali ke Dashboard
                </button>
            </div>
        `;
    }

    get404HTML() {
        return `
            <div style="text-align: center; padding: 100px 20px;">
                <h1 style="font-size: 72px; margin-bottom: 20px;">404</h1>
                <h2 style="color: #1e3c72; margin-bottom: 10px;">Halaman Tidak Ditemukan</h2>
                <p style="color: #7f8c8d; font-size: 18px;">Halaman yang Anda cari tidak tersedia</p>
                <button class="btn-primary" onclick="app.navigateTo('dashboard')" style="margin-top: 30px;">
                    Kembali ke Dashboard
                </button>
            </div>
        `;
    }

    initDashboard() {
        // Load dashboard script
        if (typeof initDashboardData === 'function') {
            initDashboardData();
        } else {
            // Fallback: load script dynamically
            const script = document.createElement('script');
            script.src = 'script.js';
            script.onload = () => {
                if (typeof initDashboard === 'function') {
                    initDashboard();
                }
            };
            document.body.appendChild(script);
        }
    }

    initJabatan() {
        // Load jabatan script
        if (typeof renderJabatanPage === 'function') {
            renderJabatanPage();
        } else {
            const script = document.createElement('script');
            script.src = 'jabatan.js';
            document.body.appendChild(script);
        }
    }

    initUjian() {
        // Load ujian script if needed
        console.log('Ujian page loaded');
    }

    getASNHTML() {
        return `
            <header class="header">
                <div>
                    <h1>Data ASN</h1>
                    <p class="breadcrumb">Dashboard > ASN</p>
                </div>
                <div class="user-info">
                    <span>Admin BKN</span>
                    <div class="avatar">A</div>
                </div>
            </header>

            <section class="action-bar">
                <button class="btn-primary" onclick="alert('Tambah ASN')">
                    <span class="btn-icon">➕</span>
                    Tambah ASN Baru
                </button>
                <div class="action-group">
                    <button class="btn-secondary" onclick="alert('Export Data')">
                        <span class="btn-icon">📥</span>
                        Export Excel
                    </button>
                    <button class="btn-secondary" onclick="alert('Import Data')">
                        <span class="btn-icon">📤</span>
                        Import Excel
                    </button>
                </div>
            </section>

            <section class="summary-section">
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(52, 152, 219, 0.1); color: #3498db;">👥</div>
                    <div>
                        <h3>Total ASN</h3>
                        <p class="summary-number-mini">1,247</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(46, 204, 113, 0.1); color: #27ae60;">✅</div>
                    <div>
                        <h3>ASN Aktif</h3>
                        <p class="summary-number-mini">1,189</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(241, 196, 15, 0.1); color: #f39c12;">⏸️</div>
                    <div>
                        <h3>Cuti/Non-Aktif</h3>
                        <p class="summary-number-mini">58</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(155, 89, 182, 0.1); color: #9b59b6;">🎓</div>
                    <div>
                        <h3>Dalam Pelatihan</h3>
                        <p class="summary-number-mini">42</p>
                    </div>
                </div>
            </section>

            <section class="filter-search-section">
                <div class="filter-search-card">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="searchASN" placeholder="Cari nama, NIP, atau jabatan..." class="search-input-main">
                    </div>
                    <div class="filter-group-inline">
                        <select class="filter-select">
                            <option value="all">Semua Golongan</option>
                            <option value="I">Golongan I</option>
                            <option value="II">Golongan II</option>
                            <option value="III">Golongan III</option>
                            <option value="IV">Golongan IV</option>
                        </select>
                        <select class="filter-select">
                            <option value="all">Semua Status</option>
                            <option value="aktif">Aktif</option>
                            <option value="cuti">Cuti</option>
                            <option value="pelatihan">Pelatihan</option>
                        </select>
                        <button class="btn-filter-reset">Reset Filter</button>
                    </div>
                </div>
            </section>

            <section class="jabatan-list-section">
                <div class="section-header">
                    <h2>Daftar ASN</h2>
                </div>

                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Foto</th>
                                <th>Nama</th>
                                <th>NIP</th>
                                <th>Jabatan</th>
                                <th>Golongan</th>
                                <th>Unit Kerja</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="asnTableBody">
                            <tr>
                                <td>1</td>
                                <td><div class="avatar" style="width: 32px; height: 32px; font-size: 12px;">AR</div></td>
                                <td><strong>Ahmad Rizki Ramadhan</strong></td>
                                <td>199001152015031001</td>
                                <td>Pranata Komputer</td>
                                <td>III/c</td>
                                <td>BKN Pusat</td>
                                <td><span class="status-badge status-normal">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="alert('Detail ASN')">Detail</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><div class="avatar" style="width: 32px; height: 32px; font-size: 12px; background: #e74c3c;">SN</div></td>
                                <td><strong>Siti Nurhaliza</strong></td>
                                <td>199205102016042002</td>
                                <td>Analis SDM Aparatur</td>
                                <td>III/b</td>
                                <td>BKN Regional</td>
                                <td><span class="status-badge status-normal">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="alert('Detail ASN')">Detail</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><div class="avatar" style="width: 32px; height: 32px; font-size: 12px; background: #27ae60;">BS</div></td>
                                <td><strong>Budi Santoso</strong></td>
                                <td>198812202014031003</td>
                                <td>Kepala Bidang Mutasi</td>
                                <td>IV/a</td>
                                <td>BKN Pusat</td>
                                <td><span class="status-badge status-normal">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="alert('Detail ASN')">Detail</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><div class="avatar" style="width: 32px; height: 32px; font-size: 12px; background: #f39c12;">DK</div></td>
                                <td><strong>Dewi Kartika Sari</strong></td>
                                <td>199103152015042001</td>
                                <td>Analis Kebijakan</td>
                                <td>III/c</td>
                                <td>BKN Pusat</td>
                                <td><span class="status-badge status-purple">Pelatihan</span></td>
                                <td>
                                    <button class="btn-action" onclick="alert('Detail ASN')">Detail</button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><div class="avatar" style="width: 32px; height: 32px; font-size: 12px; background: #9b59b6;">EP</div></td>
                                <td><strong>Eko Prasetyo</strong></td>
                                <td>198907252013031002</td>
                                <td>Auditor</td>
                                <td>III/d</td>
                                <td>BKN Regional</td>
                                <td><span class="status-badge status-normal">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="alert('Detail ASN')">Detail</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="pagination-section">
                    <div class="pagination-info">
                        Menampilkan 1-5 dari 1,247 ASN
                    </div>
                    <div class="pagination-controls">
                        <button class="btn-page">← Sebelumnya</button>
                        <div class="page-numbers">
                            <div class="page-num active">1</div>
                            <div class="page-num">2</div>
                            <div class="page-num">3</div>
                            <div class="page-num">...</div>
                            <div class="page-num">250</div>
                        </div>
                        <button class="btn-page">Berikutnya →</button>
                    </div>
                </div>
            </section>
        `;
    }

    getLaporanHTML() {
        return `
            <header class="header">
                <div>
                    <h1>Laporan & Analitik</h1>
                    <p class="breadcrumb">Dashboard > Laporan</p>
                </div>
                <div class="user-info">
                    <span>Admin BKN</span>
                    <div class="avatar">A</div>
                </div>
            </header>

            <section class="action-bar">
                <button class="btn-primary" onclick="alert('Generate Laporan')">
                    <span class="btn-icon">📊</span>
                    Generate Laporan
                </button>
                <div class="action-group">
                    <button class="btn-secondary" onclick="alert('Export PDF')">
                        <span class="btn-icon">📄</span>
                        Export PDF
                    </button>
                    <button class="btn-secondary" onclick="alert('Export Excel')">
                        <span class="btn-icon">📥</span>
                        Export Excel
                    </button>
                </div>
            </section>

            <section class="summary-section" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(52, 152, 219, 0.1); color: #3498db;">📋</div>
                    <div>
                        <h3>Total Laporan</h3>
                        <p class="summary-number-mini">156</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(46, 204, 113, 0.1); color: #27ae60;">✅</div>
                    <div>
                        <h3>Bulan Ini</h3>
                        <p class="summary-number-mini">24</p>
                    </div>
                </div>
                <div class="summary-card-mini">
                    <div class="summary-card-mini-icon" style="background: rgba(241, 196, 15, 0.1); color: #f39c12;">📊</div>
                    <div>
                        <h3>Tahun Ini</h3>
                        <p class="summary-number-mini">89</p>
                    </div>
                </div>
            </section>

            <section class="charts-section" style="margin-bottom: 30px;">
                <div class="chart-card chart-card-large">
                    <div class="chart-header">
                        <h2>📈 Grafik Pengisian Jabatan per Bulan</h2>
                    </div>
                    <div class="chart-container">
                        <canvas id="laporanChart"></canvas>
                    </div>
                </div>
            </section>

            <section class="jabatan-list-section">
                <div class="section-header">
                    <h2>Kategori Laporan</h2>
                </div>

                <div class="jabatan-grid">
                    <div class="jabatan-card" onclick="alert('Laporan Jabatan')" style="cursor: pointer;">
                        <div class="jabatan-card-header">
                            <h3 style="font-size: 18px;">📊 Laporan Jabatan</h3>
                        </div>
                        <p style="color: #7f8c8d; margin: 15px 0;">Laporan lengkap tentang status jabatan, kekosongan, dan pengisian</p>
                        <div class="jabatan-actions" style="border-top: none; padding-top: 0;">
                            <button class="btn-action-card btn-edit">Lihat Laporan</button>
                        </div>
                    </div>

                    <div class="jabatan-card" onclick="alert('Laporan ASN')" style="cursor: pointer;">
                        <div class="jabatan-card-header">
                            <h3 style="font-size: 18px;">👥 Laporan ASN</h3>
                        </div>
                        <p style="color: #7f8c8d; margin: 15px 0;">Data statistik ASN berdasarkan golongan, jabatan, dan unit kerja</p>
                        <div class="jabatan-actions" style="border-top: none; padding-top: 0;">
                            <button class="btn-action-card btn-edit">Lihat Laporan</button>
                        </div>
                    </div>

                    <div class="jabatan-card" onclick="alert('Laporan Ujian')" style="cursor: pointer;">
                        <div class="jabatan-card-header">
                            <h3 style="font-size: 18px;">📝 Laporan Ujian Kompetensi</h3>
                        </div>
                        <p style="color: #7f8c8d; margin: 15px 0;">Rekap hasil ujian kompetensi, tingkat kelulusan, dan analisis</p>
                        <div class="jabatan-actions" style="border-top: none; padding-top: 0;">
                            <button class="btn-action-card btn-edit">Lihat Laporan</button>
                        </div>
                    </div>

                    <div class="jabatan-card" onclick="alert('Laporan Kinerja')" style="cursor: pointer;">
                        <div class="jabatan-card-header">
                            <h3 style="font-size: 18px;">⭐ Laporan Kinerja</h3>
                        </div>
                        <p style="color: #7f8c8d; margin: 15px 0;">Evaluasi kinerja ASN dan pencapaian target organisasi</p>
                        <div class="jabatan-actions" style="border-top: none; padding-top: 0;">
                            <button class="btn-action-card btn-edit">Lihat Laporan</button>
                        </div>
                    </div>

                    <div class="jabatan-card" onclick="alert('Laporan Mutasi')" style="cursor: pointer;">
                        <div class="jabatan-card-header">
                            <h3 style="font-size: 18px;">🔄 Laporan Mutasi</h3>
                        </div>
                        <p style="color: #7f8c8d; margin: 15px 0;">Data perpindahan jabatan dan rotasi ASN</p>
                        <div class="jabatan-actions" style="border-top: none; padding-top: 0;">
                            <button class="btn-action-card btn-edit">Lihat Laporan</button>
                        </div>
                    </div>

                    <div class="jabatan-card" onclick="alert('Laporan Custom')" style="cursor: pointer;">
                        <div class="jabatan-card-header">
                            <h3 style="font-size: 18px;">⚙️ Laporan Custom</h3>
                        </div>
                        <p style="color: #7f8c8d; margin: 15px 0;">Buat laporan sesuai kebutuhan dengan filter khusus</p>
                        <div class="jabatan-actions" style="border-top: none; padding-top: 0;">
                            <button class="btn-action-card btn-edit">Buat Laporan</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getPengaturanHTML() {
        return `
            <header class="header">
                <div>
                    <h1>Pengaturan Sistem</h1>
                    <p class="breadcrumb">Dashboard > Pengaturan</p>
                </div>
                <div class="user-info">
                    <span>Admin BKN</span>
                    <div class="avatar">A</div>
                </div>
            </header>

            <section class="jabatan-list-section">
                <div class="section-header">
                    <h2>Konfigurasi Sistem</h2>
                </div>

                <div class="section-card" style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 20px; color: #1e3c72;">👤 Profil Admin</h3>
                    <form style="max-width: 600px;">
                        <div class="form-group">
                            <label>Nama Lengkap</label>
                            <input type="text" class="form-input" value="Admin BKN" placeholder="Nama lengkap">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-input" value="admin@bkn.go.id" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" class="form-input" value="admin_bkn" placeholder="Username">
                        </div>
                        <button type="button" class="btn-primary" onclick="alert('Profil diupdate!')">Simpan Perubahan</button>
                    </form>
                </div>

                <div class="section-card" style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 20px; color: #1e3c72;">🔒 Keamanan</h3>
                    <form style="max-width: 600px;">
                        <div class="form-group">
                            <label>Password Lama</label>
                            <input type="password" class="form-input" placeholder="Masukkan password lama">
                        </div>
                        <div class="form-group">
                            <label>Password Baru</label>
                            <input type="password" class="form-input" placeholder="Masukkan password baru">
                        </div>
                        <div class="form-group">
                            <label>Konfirmasi Password Baru</label>
                            <input type="password" class="form-input" placeholder="Konfirmasi password baru">
                        </div>
                        <button type="button" class="btn-primary" onclick="alert('Password diupdate!')">Ubah Password</button>
                    </form>
                </div>

                <div class="section-card" style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 20px; color: #1e3c72;">⚙️ Preferensi Sistem</h3>
                    <div style="max-width: 600px;">
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" checked>
                                <span>Notifikasi Email</span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" checked>
                                <span>Notifikasi Push</span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox">
                                <span>Mode Gelap</span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Bahasa</label>
                            <select class="form-input">
                                <option>Bahasa Indonesia</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Zona Waktu</label>
                            <select class="form-input">
                                <option>WIB (GMT+7)</option>
                                <option>WITA (GMT+8)</option>
                                <option>WIT (GMT+9)</option>
                            </select>
                        </div>
                        <button type="button" class="btn-primary" onclick="alert('Preferensi disimpan!')">Simpan Preferensi</button>
                    </div>
                </div>

                <div class="section-card">
                    <h3 style="margin-bottom: 20px; color: #1e3c72;">📊 Informasi Sistem</h3>
                    <div class="summary-section" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                        <div class="summary-card-mini">
                            <div class="summary-card-mini-icon" style="background: rgba(52, 152, 219, 0.1); color: #3498db;">💾</div>
                            <div>
                                <h3>Versi Sistem</h3>
                                <p class="summary-number-mini" style="font-size: 18px;">v2.5.0</p>
                            </div>
                        </div>
                        <div class="summary-card-mini">
                            <div class="summary-card-mini-icon" style="background: rgba(46, 204, 113, 0.1); color: #27ae60;">📅</div>
                            <div>
                                <h3>Update Terakhir</h3>
                                <p class="summary-number-mini" style="font-size: 16px;">24 Nov 2025</p>
                            </div>
                        </div>
                        <div class="summary-card-mini">
                            <div class="summary-card-mini-icon" style="background: rgba(155, 89, 182, 0.1); color: #9b59b6;">🔧</div>
                            <div>
                                <h3>Database</h3>
                                <p class="summary-number-mini" style="font-size: 18px;">MySQL 8.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    initASN() {
        console.log('ASN page loaded');
    }

    initLaporan() {
        // Initialize chart for Laporan
        setTimeout(() => {
            const canvas = document.getElementById('laporanChart');
            if (canvas && typeof Chart !== 'undefined') {
                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
                        datasets: [{
                            label: 'Jabatan Terisi',
                            data: [280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 328, 328],
                            borderColor: '#27ae60',
                            backgroundColor: 'rgba(46, 204, 113, 0.1)',
                            tension: 0.4,
                            fill: true
                        }, {
                            label: 'Target',
                            data: [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450],
                            borderColor: '#3498db',
                            borderDash: [5, 5],
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 500
                            }
                        }
                    }
                });
            }
        }, 100);
    }

    initPengaturan() {
        console.log('Pengaturan page loaded');
    }
}

// Initialize app
const app = new App();

// Add loading spinner styles
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #1e3c72;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-spinner p {
        margin-top: 15px;
        color: #7f8c8d;
    }
`;
document.head.appendChild(style);
