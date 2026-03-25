
const jobsData = [
    {
      id: 1,
      company: "Mobile First Corp",
      position: "React Native Developer",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 – $175,000",
      description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
      status: "not-applied"
    },
    {
      id: 2,
      company: "WebFlow Agency",
      position: "Web Designer & Developer",
      location: "Los Angeles, CA",
      type: "Part-time",
      salary: "$80,000 – $120,000",
      description: "Create stunning web experiences for high-profile clients. Must have a portfolio and experience with modern web design trends.",
      status: "not-applied"
    },
    {
      id: 3,
      company: "DataViz Solutions",
      position: "Data Visualization Specialist",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$125,000 – $165,000",
      description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
      status: "not-applied"
    },
    {
      id: 4,
      company: "CloudFirst Inc",
      position: "Backend Developer",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$140,000 – $190,000",
      description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
      status: "not-applied"
    },
    {
      id: 5,
      company: "Innovation Labs",
      position: "UI/UX Engineer",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 – $150,000",
      description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
      status: "not-applied"
    },
    {
      id: 6,
      company: "MegaCorp Solutions",
      position: "JavaScript Developer",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130,000 – $170,000",
      description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development.",
      status: "not-applied"
    },
    {
      id: 7,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000 – $160,000",
      description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
      status: "not-applied"
    },
    {
      id: 8,
      company: "TechCorp Industries",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130,000 – $175,000",
      description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. Join a talented team on cutting-edge projects.",
      status: "not-applied"
    }
  ];
  
  // ---- STATE ----
  let activeTab = "all";
  
  // ---- REFERENCES ----
  const cardsContainer   = document.getElementById("cards-container");
  const emptyState       = document.getElementById("empty-state");
  const tabButtons       = document.querySelectorAll(".tab");
  const countTotal       = document.getElementById("count-total");
  const countInterview   = document.getElementById("count-interview");
  const countRejected    = document.getElementById("count-rejected");
  const jobsCountDisplay = document.getElementById("jobs-count-display");
  

  function getStatusBadgeHTML(status) {
    if (status === "interview") {
      return `<div class="badge badge-success gap-1 font-bold text-xs uppercase tracking-wider">
                <i class="fa-solid fa-circle-check text-[10px]"></i> Interview
              </div>`;
    }
    if (status === "rejected") {
      return `<div class="badge badge-error gap-1 font-bold text-xs uppercase tracking-wider">
                <i class="fa-solid fa-circle-xmark text-[10px]"></i> Rejected
              </div>`;
    }
    return `<div class="badge badge-ghost gap-1 font-semibold text-xs uppercase tracking-wider">
              <i class="fa-regular fa-circle text-[10px]"></i> Not Applied
            </div>`;
  }
  
  // ---- BUILD CARD HTML ----
  function createCardHTML(job) {
    const isIntActive = job.status === "interview" ? "btn-success text-white" : "btn-outline btn-success";
    const isRejActive = job.status === "rejected"  ? "btn-error text-white"   : "btn-outline btn-error";
    const cardStatusClass = job.status !== "not-applied" ? `status-${job.status}` : "";
  
    return `
      <div class="card bg-base-100 shadow-sm border border-base-200
                  hover:shadow-md hover:-translate-y-1 transition-all duration-200
                  job-card ${cardStatusClass}"
           data-id="${job.id}">
        <div class="card-body p-5 gap-3">
  
          <!-- Top row: company + delete -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="font-display font-bold text-base text-base-content tracking-tight leading-tight">
                ${job.company}
              </h3>
              <p class="text-primary text-sm font-medium mt-0.5">${job.position}</p>
            </div>
            <button class="btn btn-ghost btn-xs text-base-content/30 hover:text-error hover:bg-error/10 rounded-lg"
                    data-action="delete" data-id="${job.id}" title="Remove job">
              <i class="fa-regular fa-trash-can text-sm pointer-events-none"></i>
            </button>
          </div>
  
          <!-- Meta badges -->
          <div class="flex flex-wrap gap-1.5">
            <span class="badge badge-ghost text-xs gap-1">
              <i class="fa-solid fa-location-dot text-[10px]"></i> ${job.location}
            </span>
            <span class="badge badge-ghost text-xs gap-1 text-primary bg-primary/10 border-primary/20">
              <i class="fa-solid fa-clock text-[10px]"></i> ${job.type}
            </span>
            <span class="badge badge-ghost text-xs gap-1 text-success bg-success/10 border-success/20 font-semibold">
              <i class="fa-solid fa-money-bill-wave text-[10px]"></i> ${job.salary}
            </span>
          </div>
  
          <!-- Status indicator -->
          ${getStatusBadgeHTML(job.status)}
  
          <!-- Description -->
          <p class="text-base-content/55 text-xs leading-relaxed font-light">
            ${job.description}
          </p>
  
          <!-- Action buttons -->
          <div class="card-actions justify-stretch mt-1 gap-2">
            <button class="btn btn-sm flex-1 gap-1.5 ${isIntActive}"
                    data-action="interview" data-id="${job.id}">
              <i class="fa-solid fa-comments text-xs pointer-events-none"></i> Interview
            </button>
            <button class="btn btn-sm flex-1 gap-1.5 ${isRejActive}"
                    data-action="rejected" data-id="${job.id}">
              <i class="fa-solid fa-circle-xmark text-xs pointer-events-none"></i> Rejected
            </button>
          </div>
  
        </div>
      </div>
    `;
  }
  
  // ---- FILTER ----
  function getFilteredJobs() {
    if (activeTab === "interview") return jobsData.filter(j => j.status === "interview");
    if (activeTab === "rejected")  return jobsData.filter(j => j.status === "rejected");
    return jobsData;
  }
  
  // ---- UPDATE DASHBOARD COUNTS ----
  function updateDashboardCounts() {
    animateCount(countTotal,     jobsData.length);
    animateCount(countInterview, jobsData.filter(j => j.status === "interview").length);
    animateCount(countRejected,  jobsData.filter(j => j.status === "rejected").length);
  }
  
  function animateCount(el, newVal) {
    if (parseInt(el.textContent, 10) !== newVal) {
      el.textContent = newVal;
      el.classList.remove("bump");
      void el.offsetWidth; // force reflow
      el.classList.add("bump");
    }
  }
  
  // ---- RENDER ----
  function renderCards() {
    const filtered = getFilteredJobs();
    cardsContainer.innerHTML = "";
  
    if (filtered.length === 0) {
      cardsContainer.classList.add("hidden");
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
      cardsContainer.classList.remove("hidden");
      filtered.forEach(job => {
        cardsContainer.innerHTML += createCardHTML(job);
      });
    }
  
    jobsCountDisplay.textContent = `${filtered.length} job${filtered.length !== 1 ? "s" : ""}`;
    updateDashboardCounts();
  }
  
  // ---- EVENT DELEGATION: all card interactions ----
  cardsContainer.addEventListener("click", function (e) {
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;
  
    const action = actionEl.dataset.action;
    const id     = parseInt(actionEl.dataset.id, 10);
    const job    = jobsData.find(j => j.id === id);
    if (!job) return;
  
    if (action === "delete") {
      handleDelete(id);
    } else if (action === "interview" || action === "rejected") {
      handleStatusToggle(job, action);
    }
  });
  
  function handleDelete(id) {
    const cardEl = cardsContainer.querySelector(`.job-card[data-id="${id}"]`);
    if (!cardEl) return;
    cardEl.classList.add("removing");
    cardEl.addEventListener("animationend", () => {
      const idx = jobsData.findIndex(j => j.id === id);
      if (idx !== -1) jobsData.splice(idx, 1);
      renderCards();
    }, { once: true });
  }
  
  function handleStatusToggle(job, newStatus) {
    // Clicking the already-active status resets to not-applied
    job.status = job.status === newStatus ? "not-applied" : newStatus;
    renderCards();
  }
  
  // ---- TABS ----
  tabButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      tabButtons.forEach(b => b.classList.remove("tab-active"));
      this.classList.add("tab-active");
      activeTab = this.dataset.tab;
      renderCards();
    });
  });
  
  // ---- INIT ----
  renderCards();