class AppSidebar extends HTMLElement {

    static get observedAttributes() {
        return ["active"];
    }

    static NAV_ITEMS = [

        // Dashboard
        {
            page: "dashboard",
            icon: "fa-house",
            label: "Dashboard",
            href: "dashboard.html"
        },

        // Departments
        {
            page: "departments",
            icon: "fa-building",
            label: "Departments",
            href: "department.html"
        },

        // Wards
        {
            page: "wards",
            icon: "fa-bed-pulse",
            label: "Wards",
            href: "ward.html"
        },

        // Nurses
        {
            page: "nurses",
            icon: "fa-user-nurse",
            label: "Nurses",
            href: "nurse.html"
        },

        // Doctors
        {
            page: "doctors",
            icon: "fa-user-doctor",
            label: "Doctors",
            href: "doctor.html"
        },

        // Patients
        {
            page: "patients",
            icon: "fa-hospital-user",
            label: "Patients",
            href: "patient.html"
        },

        // Appointments
        {
            page: "appointments",
            icon: "fa-calendar-check",
            label: "Appointments",
            href: "appointments.html"
        },

        // Reports
        {
            page: "reports",
            icon: "fa-chart-column",
            label: "Reports",
            href: "reports.html"
        },

        // Settings
        {
            page: "settings",
            icon: "fa-gear",
            label: "Settings",
            href: "settings.html"
        }

    ];


    connectedCallback() {
        this.render();
    }


    attributeChangedCallback() {
        this.render();
    }


    render() {

        const active = this.getAttribute("active") || "dashboard";


        const navHtml = AppSidebar.NAV_ITEMS.map(item => `

            <a href="${item.href}"
               data-page="${item.page}"
               class="${item.page === active ? "active" : ""}">

                <i class="fa-solid ${item.icon}"></i>

                <span>${item.label}</span>

            </a>

        `).join("");


        this.innerHTML = `

            <aside class="sidebar">

                <!-- ================= LOGO ================= -->

                <div class="logo">

                    <i class="fa-solid fa-hospital"></i>

                    <span>Medical System</span>

                </div>


                <!-- ================= NAVIGATION ================= -->

                <nav class="menu">

                    ${navHtml}

                </nav>


                <!-- ================= LOGOUT ================= -->

                <div class="logout">

                    <a href="#">

                        <i class="fa-solid fa-right-from-bracket"></i>

                        <span>Logout</span>

                    </a>

                </div>

            </aside>

        `;
    }
}


customElements.define("app-sidebar", AppSidebar);