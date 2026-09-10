/**
 * i18n.js - Bilingual Translation Engine (English default / Tiếng Việt)
 * Chu Tuan Ngoc - Developer Portfolio
 */

const I18N_STORAGE_KEY = 'portfolio_preferred_lang';

const translations = {
  en: {
    // Nav
    nav_skills: 'skills',
    nav_projects: 'projects',
    nav_experience: 'experience',
    nav_contact: 'contact',
    fx_rain: 'FX: RAIN',
    btn_resume: 'RESUME',
    lang_toggle: 'VI',
    lang_toggle_title: 'Chuyển sang Tiếng Việt (Switch to Vietnamese)',

    // Hero Section
    hero_avail_status: 'AVAILABLE FOR FULL-TIME ROLES',
    hero_role_chip: 'Mobile & Backend Developer',
    hero_location_chip: 'Hanoi, Vietnam (UTC+7)',
    hero_edu_chip: 'FPT University (B.S. Software Engineering)',
    hero_name_sub: '',
    hero_role_title: 'Senior Student & Software Engineer',
    hero_role_badge: 'Mobile & Backend Specialist',
    hero_btn_cv: 'DOWNLOAD / VIEW CV',
    hero_btn_projects: 'EXPLORE PROJECTS',
    hero_quick_jump: 'Quick jump:',
    quick_skills: 'cat skills.json',
    quick_projects: 'git log --projects',
    quick_exp: './view_experience.sh',
    quick_contact: './ping_me.sh',

    // Avatar 3D
    avatar_badge: '>_ 3D_ASCII_PORTRAIT.sys',
    avatar_live_badge: 'LIVE 360° VIEW',
    avatar_hint: '[DRAG TO ROTATE 360°]',

    // Typewriter Phrases
    typewriter_phrases: [
      "Building high-performance Flutter mobile applications.",
      "Architecting scalable Java & Spring Boot microservices.",
      "Optimizing PostgreSQL & Redis cache layers for speed.",
      "Crafting clean code & intuitive user experiences.",
      "ComiVerse Capstone - Graded Excellent at FPT University.",
      "Ready for Full-time Software Engineering roles."
    ],

    // Skills Section
    skills_spec_tag: 'SYSTEM_SPEC // DOMAIN_CAPABILITIES',
    skills_title: '01. Tech Stack',
    skills_desc: 'Grouped technological competencies focusing on robust backend service architectures and high-performance cross-platform mobile solutions.',
    skills_cat1_title: 'mobile_and_frontend.sys',
    skills_cat1_desc: 'Building cross-platform mobile apps with optimized UX, state management, and modern responsive UI.',
    skills_cat2_title: 'backend_and_architecture.service',
    skills_cat2_desc: 'Designing RESTful APIs, JWT/OAuth2 security, real-time WebSocket communication, and microservices.',
    skills_cat3_title: 'database_and_storage.conf',
    skills_cat3_desc: 'Relational and NoSQL database optimization, in-memory caching for low latency, and cloud asset storage.',
    skills_cat4_title: 'devops_and_workflow.env',
    skills_cat4_desc: 'Containerization, API automated testing, Git version control workflows, and Agile/Scrum engineering standards.',

    // Projects Section
    projects_spec_tag: 'PORTFOLIO_MODULES // PRODUCTION_READY',
    projects_title: '02. Featured Projects',
    projects_desc: 'Production-grade featured projects demonstrating system design mindset, full-stack programming capability, and complete mobile development expertise.',
    btn_live_demo: 'Live Demo',
    btn_frontend_repo: 'Frontend Repo',
    btn_backend_repo: 'Backend Repo',
    btn_mobile_repo: 'Mobile Repository',
    btn_source_repo: 'Source Repository',

    // Project 1 - ComiVerse Web
    p1_status: 'DEPLOYED & GRADED EXCELLENT',
    p1_pill: 'Web Application & Ecosystem',
    p1_chip: '// 01. CAPSTONE PROJECT (TEAM OF 5)',
    p1_title: 'ComiVerse — Web Platform',
    p1_subtitle: 'Digital Comic Reading Platform & Creator Community Social Network',
    p1_desc: 'Comprehensive ecosystem for comic readers and creators. Features fluid reading experience, role-based access, automated Stripe VIP subscription billing, and real-time community chat rooms.',
    p1_contrib_title: 'Key Roles & Architectural Contributions:',
    p1_b1: '<strong>Backend & Architecture:</strong> Engineered RESTful API architecture with Java Spring Boot, managed session & auth with Spring Security, JWT & OAuth2.',
    p1_b2: '<strong>High Performance:</strong> Optimized complex relational PostgreSQL schema, integrated Redis Cache slashing comic chapter load latency by 75%.',
    p1_b3: '<strong>Payments & Real-time:</strong> Integrated Stripe Webhooks for secure payment processing; built real-time chapter comments and notifications using STOMP WebSocket.',
    p1_b4: '<strong>Frontend:</strong> Collaborated on high-interactivity comic reader web UI using React 19 with optimized DOM rendering.',

    // Project 2 - ComiVerse Mobile
    p2_status: 'CROSS-PLATFORM APP',
    p2_pill: 'iOS & Android App',
    p2_chip: '// 02. MOBILE CLIENT ARCHITECTURE',
    p2_title: 'ComiVerse Mobile',
    p2_subtitle: 'Cross-Platform Mobile Comic Reader Application (Flutter / Dart)',
    p2_desc: 'Native cross-platform mobile client optimized for iOS and Android smartphones. Allows readers to follow favorite series, manage bookmarks, pre-cache chapters for offline reading, and receive instant push updates.',
    p2_contrib_title: 'Key Roles & Contributions:',
    p2_b1: '<strong>Mobile Architecture:</strong> Built entire Flutter client architecture with Riverpod state management, adhering to clean separation of Service, Repository, and ViewModel layers.',
    p2_b2: '<strong>Custom Webtoon Reader:</strong> Programmed ultra-smooth vertical scrolling manga/comic reader engine with pinch-to-zoom gestures and per-chapter scroll progress memory.',
    p2_b3: '<strong>Offline & Notifications:</strong> Integrated SQLite/Hive for offline chapter storage and configured Firebase Cloud Messaging (FCM) for instant release notifications.',

    // Project 3 - EnglishParty
    p3_status: 'SOLO DEV & LIVE PWA',
    p3_pill: 'Gamified EdTech & PWA',
    p3_chip: '// 03. SOLO FULL-STACK PROJECT',
    p3_title: 'EnglishParty',
    p3_subtitle: 'CEFR-Aligned (A1 - C2) English Learning Web Platform with Gamification',
    p3_desc: 'Independently engineered end-to-end from concept, UI/UX design to implementation and production deployment. Implements CEFR learning path with Spaced Repetition algorithms and daily streaks.',
    p3_contrib_title: 'Key Roles & Architectural Contributions:',
    p3_b1: '<strong>100% Solo Engineering:</strong> Developed entire app from scratch with React 19, TypeScript, Vite, and TailwindCSS with modular architecture.',
    p3_b2: '<strong>Serverless State & Backend:</strong> Integrated Firebase Authentication & Firestore NoSQL, orchestrated reactive global state using Zustand.',
    p3_b3: '<strong>Gamification & PWA:</strong> Built leaderboard ranking, streak mechanics, and packaged as an installable Progressive Web App (PWA).',

    // Project 4 - UniEvents
    p4_status: 'CAMPUS PRODUCT',
    p4_pill: 'Smart Campus Ticketing',
    p4_chip: '// 04. MOBILE APPLICATION',
    p4_title: 'UniEvents',
    p4_subtitle: 'Smart Campus Event Discovery & Automated QR Ticketing Mobile App',
    p4_desc: 'Mobile solution digitizing university campus event workflows: from workshop and hackathon registrations, personalized anti-duplication QR ticketing, to instant check-in verification.',
    p4_contrib_title: 'Key Roles & Architectural Contributions:',
    p4_b1: '<strong>Client UI/UX:</strong> Built minimalist Flutter mobile app, streamlining event ticket acquisition into a 3-tap experience.',
    p4_b2: '<strong>QR Code Engine:</strong> Built encrypted QR ticket generation to prevent duplicate forgery, and camera scanner for instantaneous attendee verification.',
    p4_b3: '<strong>Calendar & Reminders:</strong> Synchronized upcoming event schedules into native device calendar with live countdown notifications.',

    // Experience & Education Section
    exp_spec_tag: 'CAREER_TIMELINE // CERTIFIED_MILESTONES',
    exp_title: '03. Experience & Education',
    exp_desc: 'Formal university training, enterprise On-the-Job Training (OJT) experience, and foundational software engineering milestones.',
    
    exp_cat_exp: 'ENTERPRISE WORK EXPERIENCE (OJT)',
    exp_period_ojt: 'OJT PROGRAM',
    exp_job_title: 'Software Engineer Intern (OJT)',
    exp_job_company: 'FPT Software Academy — FPT Software',
    exp_job_badge: 'CERTIFIED OJT GRADUATE',
    exp_job_desc: 'Participated in enterprise On-the-Job Training (OJT) at FPT Software Academy, working under industry-standard software engineering workflows and developing backend services.',
    exp_job_b1: 'Participated in designing and delivering RESTful API service modules using Java and Spring Boot, strictly following Clean Code and Enterprise layered architecture.',
    exp_job_b2: 'Investigated and applied relational database query optimizations, efficient table schema design, and indexing strategies for higher throughput.',
    exp_job_b3: 'Operated in Agile/Scrum sprints: actively contributed to Sprint Planning, Daily Stand-ups, Sprint Reviews, and maintained disciplined Git branching and pull request reviews.',
    exp_job_b4: 'Successfully completed the training program and received the official OJT Graduate Certificate from FPT Software Academy.',

    exp_cat_edu: 'FORMAL EDUCATION',
    exp_period_degree: '4-YEAR BACHELOR',
    edu_degree_title: 'Bachelor of Science in Software Engineering',
    edu_school: 'FPT University (Hanoi, Vietnam)',
    edu_desc: 'Major in Software Engineering. Rigorous curriculum in Data Structures & Algorithms, Object-Oriented Design (OOP), Distributed Systems Architecture, Mobile App Development, and Modern Web Engineering.',
    edu_b1: '<strong>Capstone Project:</strong> Developed ComiVerse — Integrated Web & Cross-Platform Mobile digital comic reading platform and social community, evaluated with Excellence by university committee.',
    edu_b2: '<strong>Technical Foundation:</strong> Thorough mastery of modern architecture patterns (Clean Architecture, MVC, Microservices), software testing methodologies, and CI/CD pipelines.',
    edu_b3: 'Active contributor to developer student communities, software research projects, and university programming clubs.',

    // Contact Section
    contact_spec_tag: 'ESTABLISH_UPLINK // REACH_OUT',
    contact_title: '04. Contact & Connect',
    contact_desc: 'Open for Full-time engineering opportunities (Mobile / Backend / Software Engineer), technical collaborations, or engineering discussions.',
    contact_status: 'READY_FOR_COMM',
    contact_status_banner: '[STATUS: READY FOR CONNECTION]',
    contact_quote_line1: '"Writing clean code, designing resilient architectures,',
    contact_quote_line2: ' and crafting refined user experiences is my core passion."',
    contact_lbl_email: 'EMAIL ADDRESS',
    contact_lbl_github: 'GITHUB PROFILE',
    contact_lbl_linkedin: 'LINKEDIN PROFILE',
    contact_lbl_location: 'LOCATION',
    contact_val_location: 'Hanoi, Vietnam (Ready to relocate / Remote)',
    contact_btn_copy: 'COPY',
    contact_btn_copied: 'COPIED!',

    // CLI Console
    cli_title: 'interactive_cli.exe',
    cli_status: 'INTERACTIVE',
    cli_welcome_sys: 'Antigravity Terminal CLI v2.5 initialized.',
    cli_welcome_hint: "Type 'help' to inspect available developer commands.",
    cli_welcome_user: '✔ Hello! Feel free to execute commands like \'skills\', \'projects\', \'resume\', or \'sudo hire\'.',
    cli_placeholder: "type 'help' and press Enter...",

    // Modal
    modal_title: 'RESUME_VIEWER // CHU_TUAN_NGOC.pdf',
    modal_summary_title: 'EXECUTIVE SUMMARY',
    modal_summary_text: 'Software Engineering student at FPT University passionate about building cross-platform Mobile apps (Flutter) and high-performance Backend microservices (Java / Spring Boot / PostgreSQL / Redis). Practical engineering experience through the Capstone ComiVerse project graded Excellent, and completed enterprise OJT at FPT Software Academy.',
    modal_skills_title: 'CORE SKILLS HIGHLIGHT',
    modal_note: '[NOTE: Contact directly via ngoctuan653@gmail.com for the complete PDF CV, or send an email below]',
    modal_btn_close: 'Close',
    modal_btn_email: 'Send Direct Email',

    // Footer
    footer_copy: '[EOF] Designed & Engineered with raw HTML, CSS & JavaScript. Terminal Aesthetic 2025-2026.',
    footer_online: 'SYSTEM: ONLINE | HANOI, VN',
    footer_top: 'TOP'
  },

  vi: {
    // Nav
    nav_skills: 'kỹ năng',
    nav_projects: 'dự án',
    nav_experience: 'kinh nghiệm',
    nav_contact: 'liên hệ',
    fx_rain: 'HIỆU ỨNG: MƯA',
    btn_resume: 'HỒ SƠ CV',
    lang_toggle: 'EN',
    lang_toggle_title: 'Switch to English (Chuyển sang Tiếng Anh)',

    // Hero Section
    hero_avail_status: 'SẴN SÀNG LÀM VIỆC FULL-TIME',
    hero_role_chip: 'Lập trình viên Mobile & Backend',
    hero_location_chip: 'Hà Nội, Việt Nam (UTC+7)',
    hero_edu_chip: 'Đại học FPT (Kỹ sư Phần mềm)',
    hero_name_sub: '',
    hero_role_title: 'Sinh viên năm cuối & Kỹ sư Phần mềm',
    hero_role_badge: 'Chuyên sâu Mobile & Backend',
    hero_btn_cv: 'XEM / TẢI CV',
    hero_btn_projects: 'KHÁM PHÁ DỰ ÁN',
    hero_quick_jump: 'Chuyển nhanh:',
    quick_skills: 'cat skills.json',
    quick_projects: 'git log --projects',
    quick_exp: './view_experience.sh',
    quick_contact: './ping_me.sh',

    // Avatar 3D
    avatar_badge: '>_ 3D_ASCII_PORTRAIT.sys',
    avatar_live_badge: 'XOAY 360° TRỰC QUAN',
    avatar_hint: '[KÉO ĐỂ XOAY 360°]',

    // Typewriter Phrases
    typewriter_phrases: [
      "Phát triển ứng dụng di động Flutter hiệu năng cao.",
      "Xây dựng kiến trúc backend Java & Spring Boot chịu tải tốt.",
      "Tối ưu hóa tầng dữ liệu PostgreSQL & bộ đệm Redis thần tốc.",
      "Viết mã sạch chuẩn hóa và trau chuốt trải nghiệm người dùng.",
      "Đồ án tốt nghiệp ComiVerse đạt đánh giá Xuất sắc tại ĐH FPT.",
      "Sẵn sàng đảm nhận vị trí Kỹ sư Phần mềm Full-time."
    ],

    // Skills Section
    skills_spec_tag: 'THÔNG_SỐ_HỆ_THỐNG // NĂNG_LỰC_CHUYÊN_MÔN',
    skills_title: '01. Kỹ Năng Công Nghệ',
    skills_desc: 'Phân nhóm kỹ năng công nghệ chuyên sâu theo từng mảng, tập trung vào kiến trúc hệ thống backend bền vững và giải pháp ứng dụng di động hiệu năng cao.',
    skills_cat1_title: 'mobile_and_frontend.sys',
    skills_cat1_desc: 'Phát triển ứng dụng đa nền tảng tối ưu trải nghiệm, quản lý state bài bản, giao diện responsive hiện đại.',
    skills_cat2_title: 'backend_and_architecture.service',
    skills_cat2_desc: 'Thiết kế RESTful APIs, bảo mật phân quyền với JWT/OAuth2, xử lý real-time WebSocket, cấu trúc microservices.',
    skills_cat3_title: 'database_and_storage.conf',
    skills_cat3_desc: 'Tối ưu hóa cơ sở dữ liệu quan hệ và NoSQL, triển khai in-memory caching tốc độ cao, quản lý lưu trữ đám mây.',
    skills_cat4_title: 'devops_and_workflow.env',
    skills_cat4_desc: 'Quy trình containerization, kiểm thử API, quản lý phiên bản mã nguồn, quy chuẩn làm việc Agile/Scrum.',

    // Projects Section
    projects_spec_tag: 'DỰ_ÁN_TIÊU_BIỂU // MÔI_TRƯỜNG_THỰC_TẾ',
    projects_title: '02. Dự Án Tiêu Biểu',
    projects_desc: 'Các dự án thực chiến tiêu biểu thể hiện tư duy thiết kế hệ thống, khả năng lập trình full-stack và kỹ năng phát triển ứng dụng di động hoàn chỉnh.',
    btn_live_demo: 'Xem Trực Tiếp',
    btn_frontend_repo: 'Mã Nguồn Frontend',
    btn_backend_repo: 'Mã Nguồn Backend',
    btn_mobile_repo: 'Mã Nguồn Mobile',
    btn_source_repo: 'Kho Mã Nguồn',

    // Project 1 - ComiVerse Web
    p1_status: 'TRIỂN KHAI & ĐÁNH GIÁ XUẤT SẮC',
    p1_pill: 'Ứng dụng Web & Hệ sinh thái',
    p1_chip: '// 01. ĐỒ ÁN TỐT NGHIỆP CAPSTONE (NHÓM 5 NGƯỜI)',
    p1_title: 'ComiVerse — Web Platform',
    p1_subtitle: 'Nền tảng đọc truyện tranh kỹ thuật số & Mạng xã hội cộng đồng tác giả',
    p1_desc: 'Hệ sinh thái toàn diện phục vụ độc giả và tác giả truyện tranh. Cung cấp trải nghiệm đọc mượt mà, phân quyền thành viên, hệ thống thanh toán gói VIP tự động qua Stripe, và phòng chat cộng đồng thời gian thực.',
    p1_contrib_title: 'Vai trò & Đóng góp nổi bật:',
    p1_b1: '<strong>Backend & Kiến trúc:</strong> Thiết kế hệ thống RESTful APIs với Java Spring Boot, quản lý session và authentication với Spring Security & JWT/OAuth2.',
    p1_b2: '<strong>Hiệu Năng Cao:</strong> Thiết kế schema PostgreSQL tối ưu quan hệ phức tạp, áp dụng Redis Cache giảm độ trễ truy vấn chương truyện tới 75%.',
    p1_b3: '<strong>Thanh toán & Real-time:</strong> Tích hợp cổng thanh toán Stripe Webhooks xử lý nạp tiền / mua gói thành viên an toàn; xây dựng bình luận thời gian thực với WebSocket.',
    p1_b4: '<strong>Giao diện:</strong> Cùng đội ngũ xây dựng giao diện đọc truyện tương tác cao trên React 19 tối ưu tốc độ render.',

    // Project 2 - ComiVerse Mobile
    p2_status: 'ỨNG DỤNG ĐA NỀN TẢNG',
    p2_pill: 'Ứng dụng iOS & Android',
    p2_chip: '// 02. KIẾN TRÚC CLIENT DI ĐỘNG',
    p2_title: 'ComiVerse Mobile',
    p2_subtitle: 'Ứng dụng đọc truyện tranh di động đa nền tảng (Flutter / Dart)',
    p2_desc: 'Phiên bản di động độc lập được tối ưu cho cả smartphone Android và iOS. Cho phép người dùng theo dõi các tác phẩm yêu thích, lưu bookmark đọc dở, tải trước chương truyện để đọc offline và nhận thông báo khi có chương mới.',
    p2_contrib_title: 'Vai trò & Đóng góp nổi bật:',
    p2_b1: '<strong>Kiến trúc Mobile:</strong> Xây dựng toàn bộ kiến trúc ứng dụng Flutter sử dụng State Management Riverpod, chia tách tầng Service, Repository và ViewModel rõ ràng.',
    p2_b2: '<strong>Webtoon Reader Tùy Biến:</strong> Lập trình bộ đọc truyện lướt dọc (vertical scroll) siêu mượt, hỗ trợ cử chỉ zoom/pinch, tự động ghi nhớ vị trí scroll của từng chương.',
    p2_b3: '<strong>Offline & Thông Báo:</strong> Tích hợp SQLite/Hive để lưu cache ngoại tuyến và cấu hình Firebase Cloud Messaging (FCM) thông báo tức thì khi tác giả đăng chương.',

    // Project 3 - EnglishParty
    p3_status: 'DỰ ÁN CÁ NHÂN & PWA TRỰC TUYẾN',
    p3_pill: 'EdTech Gamification & PWA',
    p3_chip: '// 03. DỰ ÁN CÁ NHÂN TOÀN DIỆN (SOLO FULL-STACK)',
    p3_title: 'EnglishParty',
    p3_subtitle: 'Nền tảng học tiếng Anh chuẩn khung CEFR (A1 - C2) tích hợp Gamification',
    p3_desc: 'Dự án tự tay phát triển 100% từ khâu ý tưởng, thiết kế UI/UX đến hiện thực hóa mã nguồn và triển khai production. Hỗ trợ lộ trình chuẩn hóa từ A1 đến C2 với thuật toán lặp lại ngắt quãng (Spaced Repetition) và chuỗi học tập (Streak) giữ chân người học.',
    p3_contrib_title: 'Vai trò & Đóng góp nổi bật:',
    p3_b1: '<strong>Độc lập 100%:</strong> Tự lập trình toàn bộ sản phẩm với React 19, TypeScript, Vite và TailwindCSS, cấu trúc module dễ mở rộng.',
    p3_b2: '<strong>State & Backend Serverless:</strong> Tích hợp Firebase Authentication & Firestore NoSQL, quản trị state toàn cục mượt mà với Zustand.',
    p3_b3: '<strong>Gamification & PWA:</strong> Xây dựng hệ thống bảng vàng xếp hạng, chuỗi học streak mỗi ngày và đóng gói PWA giúp cài đặt như app native trên điện thoại/máy tính.',

    // Project 4 - UniEvents
    p4_status: 'SẢN PHẨM HỌC ĐƯỜNG',
    p4_pill: 'Vé Sự Kiện Học Đường Thông Minh',
    p4_chip: '// 04. ỨNG DỤNG DI ĐỘNG HỌC ĐƯỜNG',
    p4_title: 'UniEvents',
    p4_subtitle: 'Ứng dụng khám phá & Quản lý vé sự kiện học đường thông minh',
    p4_desc: 'Giải pháp di động số hóa quy trình tổ chức sự kiện tại các trường đại học: từ đăng ký tham dự workshop/hackathon, sinh mã vé QR Code cá nhân hóa, đến kiểm soát check-in tại cổng sự kiện nhanh chóng.',
    p4_contrib_title: 'Vai trò & Đóng góp nổi bật:',
    p4_b1: '<strong>Giao diện UI/UX:</strong> Xây dựng ứng dụng Flutter với giao diện tối giản, tối ưu flow đăng ký vé tham dự chỉ trong 3 chạm.',
    p4_b2: '<strong>Engine QR Code:</strong> Tích hợp cơ chế sinh mã vé QR mã hóa chống sao chép và camera scanner xác thực vé tức thời cho ban tổ chức.',
    p4_b3: '<strong>Lịch & Nhắc hẹn:</strong> Đồng bộ lịch sự kiện vào calendar của điện thoại kèm tính năng đếm ngược thời gian bắt đầu.',

    // Experience & Education Section
    exp_spec_tag: 'DÒNG_THỜI_GIAN // CỘT_MỐC_CHỨNG_CHỈ',
    exp_title: '03. Kinh Nghiệm & Học Vấn',
    exp_desc: 'Hành trình đào tạo chính quy, kinh nghiệm thực tập tại môi trường doanh nghiệp quy chuẩn và các cột mốc phát triển năng lực công nghệ.',
    
    exp_cat_exp: 'KINH NGHIỆM DOANH NGHIỆP (WORK EXPERIENCE)',
    exp_period_ojt: 'CHƯƠNG TRÌNH OJT',
    exp_job_title: 'Thực tập sinh Kỹ sư Phần mềm (OJT)',
    exp_job_company: 'FPT Software Academy — FPT Software',
    exp_job_badge: 'CHỨNG CHỈ TỐT NGHIỆP OJT',
    exp_job_desc: 'Tham gia chương trình On-the-Job Training (OJT) thực tế tại FPT Software Academy, tiếp cận quy trình sản xuất phần mềm chuẩn doanh nghiệp và tham gia xây dựng các dịch vụ backend chuyên sâu.',
    exp_job_b1: 'Tham gia thiết kế và triển khai các module dịch vụ RESTful API sử dụng Java và Spring Boot, tuân thủ chuẩn Clean Code và kiến trúc phân lớp Enterprise.',
    exp_job_b2: 'Tìm hiểu và áp dụng các giải pháp tối ưu hóa câu truy vấn cơ sở dữ liệu quan hệ, thiết kế bảng dữ liệu và lập chỉ mục (indexing) nâng cao hiệu năng.',
    exp_job_b3: 'Làm việc trong môi trường Agile/Scrum: tham gia các buổi Sprint Planning, Daily Stand-up, Sprint Review và tuân thủ quy trình Git branching, pull request code review nghiêm ngặt.',
    exp_job_b4: 'Hoàn thành xuất sắc toàn bộ khóa huấn luyện và được FPT Software Academy cấp chứng chỉ tốt nghiệp OJT ghi nhận năng lực chuyên môn.',

    exp_cat_edu: 'HỌC VẤN CHÍNH QUY (FORMAL EDUCATION)',
    exp_period_degree: 'CỬ NHÂN 4 NĂM',
    edu_degree_title: 'Cử nhân Kỹ thuật Phần mềm',
    edu_school: 'Đại học FPT (Hà Nội, Việt Nam)',
    edu_desc: 'Chuyên ngành Kỹ thuật Phần mềm (Software Engineering). Đào tạo chuyên sâu về cấu trúc dữ liệu và giải thuật, thiết kế hướng đối tượng (OOP), kiến trúc hệ thống phân tán, lập trình di động và công nghệ web hiện đại.',
    edu_b1: '<strong>Đồ án tốt nghiệp (Capstone):</strong> Thực hiện dự án ComiVerse — Hệ thống đọc truyện và mạng xã hội tranh tích hợp Web & Mobile đa nền tảng, được hội đồng đánh giá xuất sắc.',
    edu_b2: '<strong>Nền tảng kỹ thuật:</strong> Nắm vững các kiến trúc ứng dụng (Clean Architecture, MVC, Microservices), phương pháp luận kiểm thử phần mềm và triển khai CI/CD.',
    edu_b3: 'Tích cực tham gia các hoạt động công nghệ, câu lạc bộ lập trình sinh viên và đồ án nghiên cứu phát triển phần mềm ứng dụng.',

    // Contact Section
    contact_spec_tag: 'KẾT_NỐI // TRAO_ĐỔI_CÔNG_VIỆC',
    contact_title: '04. Liên Hệ & Kết Nối',
    contact_desc: 'Sẵn sàng kết nối cho các cơ hội việc làm Full-time (Mobile / Backend / Software Engineer), dự án hợp tác hoặc trao đổi công nghệ.',
    contact_status: 'SẴN_SÀNG_KẾT_NỐI',
    contact_status_banner: '[TRẠNG THÁI: SẴN SÀNG KẾT NỐI]',
    contact_quote_line1: '"Tạo ra những dòng code sạch, kiến trúc vững chắc',
    contact_quote_line2: ' và trải nghiệm người dùng tinh tế là đam mê của tôi."',
    contact_lbl_email: 'ĐỊA CHỈ EMAIL',
    contact_lbl_github: 'HỒ SƠ GITHUB',
    contact_lbl_linkedin: 'HỒ SƠ LINKEDIN',
    contact_lbl_location: 'ĐỊA ĐIỂM',
    contact_val_location: 'Hà Nội, Việt Nam (Sẵn sàng làm việc trực tiếp / Remote)',
    contact_btn_copy: 'SAO CHÉP',
    contact_btn_copied: 'ĐÃ CHÉP!',

    // CLI Console
    cli_title: 'interactive_cli.exe',
    cli_status: 'TƯƠNG_TÁC',
    cli_welcome_sys: 'Khởi tạo Antigravity Terminal CLI v2.5 thành công.',
    cli_welcome_hint: "Gõ lệnh 'help' để xem danh sách các lệnh dành cho lập trình viên.",
    cli_welcome_user: "✔ Xin chào! Bạn có thể thử các lệnh như 'skills', 'projects', 'resume', hoặc 'sudo hire'.",
    cli_placeholder: "gõ 'help' và nhấn Enter...",

    // Modal
    modal_title: 'TRÌNH_XEM_CV // CHU_TUAN_NGOC.pdf',
    modal_summary_title: 'TÓM TẮT CHUYÊN MÔN',
    modal_summary_text: 'Sinh viên chuyên ngành Kỹ thuật Phần mềm (Đại học FPT) với đam mê sâu sắc trong việc xây dựng hệ sinh thái ứng dụng Mobile (Flutter) và kiến trúc dịch vụ Backend hiệu năng cao (Java / Spring Boot / PostgreSQL / Redis). Kinh nghiệm thực chiến qua dự án tốt nghiệp Capstone ComiVerse đạt đánh giá xuất sắc và hoàn thành kỳ thực tập OJT tại FPT Software Academy.',
    modal_skills_title: 'KỸ NĂNG CỐT LÕI',
    modal_note: '[LƯU Ý: Bạn có thể liên hệ trực tiếp qua email ngoctuan653@gmail.com để nhận bản PDF CV đầy đủ nhất hoặc gửi email bên dưới]',
    modal_btn_close: 'Đóng',
    modal_btn_email: 'Gửi Email Trực Tiếp',

    // Footer
    footer_copy: '[EOF] Thiết kế & Xây dựng bằng HTML, CSS & JavaScript thuần. Phong cách Terminal ASCII 2025-2026.',
    footer_online: 'HỆ THỐNG: TRỰC TUYẾN | HÀ NỘI, VN',
    footer_top: 'LÊN ĐẦU'
  }
};

/**
 * Get current active language ('en' | 'vi')
 */
function getLanguage() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (saved === 'vi' || saved === 'en') {
    return saved;
  }
  return 'en'; // Default language is English as requested
}

/**
 * Apply language to DOM elements
 * @param {'en'|'vi'} lang
 */
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'vi') lang = 'en';
  
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  const dict = translations[lang];
  if (!dict) return;

  // 1. Text elements with data-i18n
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // 2. HTML elements with data-i18n-html
  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // 3. Placeholder attributes with data-i18n-placeholder
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // 4. Title attributes with data-i18n-title
  const titleElements = document.querySelectorAll('[data-i18n-title]');
  titleElements.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.setAttribute('title', dict[key]);
    }
  });

  // 5. Update language toggle button label
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    const badgeEl = langToggleBtn.querySelector('.lang-current');
    const targetEl = langToggleBtn.querySelector('.lang-next');
    if (badgeEl) badgeEl.textContent = lang.toUpperCase();
    if (targetEl) targetEl.textContent = lang === 'en' ? 'VI' : 'EN';
    langToggleBtn.setAttribute('title', dict.lang_toggle_title || '');
  }

  // 6. Trigger custom event for other scripts (typewriter, CLI)
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Export for global usage
window.i18n = {
  getLanguage,
  setLanguage,
  translations
};
