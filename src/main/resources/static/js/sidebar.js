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
            href: "sidebar.html"
        },

        // Departments & Wards
        {
            page: "departments",
            icon: "fa-building",
            label: "Departments & Wards",
            href: "department-ward.html"
        },

        // Expenses
        {
            page: "expenses",
            icon: "fa-money-bill-wave",
            label: "Expenses",
            href: "expense.html"
        },

        // Medicines & Suppliers
        {
            page: "medicines",
            icon: "fa-pills",
            label: "Medicines & Suppliers",
            href: "medicine-supplier.html"
        },

        // Doctors & Nurses
        {
            page: "doctors",
            icon: "fa-user-doctor",
            label: "Doctors & Nurses",
            href: "doctor-nurse.html"
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
            href: "appointment.html"
        },

        // Appointment Medicines
        {
            page: "appointmentmedicines",
            icon: "fa-prescription-bottle-medical",
            label: "Appointment Medicines",
            href: "appointmentmedicine.html"
        },

        // Payments
        {
            page: "payments",
            icon: "fa-money-check-dollar",
            label: "Payments",
            href: "payment.html"
        },

        // Medical History
        {
            page: "medicalhistory",
            icon: "fa-notes-medical",
            label: "Medical History",
            href: "medicalhistory.html"
        },

        // Lab Tests
        {
            page: "labtests",
            icon: "fa-vial",
            label: "Lab Tests",
            href: "labtest.html"
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