// Ambil data dari localStorage
let contacts = JSON.parse(localStorage.getItem("contacts")) || [
  {
    id: 1,
    fullName: "Hanum Widianingtias",
    phone: "085899106071",
    email: "widianingtiashanum@gmail.com",
    location: "Jakarta",
  },
  {
    id: 2,
    fullName: "Na Jaemin",
    phone: "081308200016",
    email: "jaeminna@gmail.com",
    location: "Busan",
  },
];

function saveToLocal() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

document.addEventListener("DOMContentLoaded", () => {
  const contactsContainer = document.querySelector(".contacts-container");
  const searchInput = document.getElementById("searchInput");

  const modal = document.getElementById("addModal");
  const openAdd = document.getElementById("openAdd");
  const cancelAdd = document.getElementById("cancelAdd");
  const saveAdd = document.getElementById("saveAdd");

  const modalName = document.getElementById("modalName");
  const modalEmail = document.getElementById("modalEmail");
  const modalPhone = document.getElementById("modalPhone");
  const modalLocation = document.getElementById("modalLocation");

  // Modal Edit
  const editModal = document.getElementById("editModal");
  const editName = document.getElementById("editName");
  const editEmail = document.getElementById("editEmail");
  const editPhone = document.getElementById("editPhone");
  const editLocation = document.getElementById("editLocation");
  const saveEdit = document.getElementById("saveEdit");
  const cancelEdit = document.getElementById("cancelEdit");

  // Modal Delete
  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let selectedId = null;

  function renderContacts(list = contacts) {
    contactsContainer.innerHTML = "";
    list.forEach((contact) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-200";
      card.dataset.id = contact.id;

      card.innerHTML = `
        <h2 class="text-xl font-bold mb-2" style="color:#3A5A8A;">${contact.fullName}</h2>
        <p class="text-sm mb-1 text-gray-700">📞 ${contact.phone}</p>
        <p class="text-sm mb-1 text-gray-700">✉ ${contact.email}</p>
        <p class="text-sm mb-3 text-gray-700">📍 ${contact.location}</p>

        <div class="flex justify-center space-x-6">

          <!-- EDIT ICON -->
          <button class="editBtn hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.862 3.487l2.651 2.65a2.25 2.25 0 010 3.182L8.873 21H5.25v-3.621L13.68 6.487a2.25 2.25 0 013.182 0z" />
            </svg>
          </button>

          <!-- DELETE ICON -->
          <button class="deleteBtn hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m4-6v6" />
            </svg>
          </button>

        </div>
      `;

      contactsContainer.appendChild(card);
    });

    attachButtonEvents();
  }

  renderContacts();

  // SEARCH
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = contacts.filter((c) =>
      c.fullName.toLowerCase().includes(keyword)
    );
    renderContacts(filtered);
  });

  // ==== OPEN ADD MODAL ====
  openAdd.onclick = () => {
    modal.style.display = "flex";
    modalName.value = "";
    modalEmail.value = "";
    modalPhone.value = "";
    modalLocation.value = "";
  };

  cancelAdd.onclick = () => {
    modal.style.display = "none";
  };

  saveAdd.onclick = () => {
    const newContact = {
      id: Date.now(),
      fullName: modalName.value || "-",
      email: modalEmail.value || "-",
      phone: modalPhone.value || "-",
      location: modalLocation.value || "-",
    };

    contacts.push(newContact);
    saveToLocal();
    renderContacts();
    modal.style.display = "none";
  };

  // ==== EDIT & DELETE BUTTON EVENTS ====
  function attachButtonEvents() {
    document.querySelectorAll(".editBtn").forEach((btn) => {
      btn.onclick = () => {
        const card = btn.closest("div[data-id]");
        selectedId = Number(card.dataset.id);

        const c = contacts.find((x) => x.id === selectedId);

        editName.value = c.fullName;
        editEmail.value = c.email;
        editPhone.value = c.phone;
        editLocation.value = c.location;

        editModal.style.display = "flex";
      };
    });

    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.onclick = () => {
        const card = btn.closest("div[data-id]");
        selectedId = Number(card.dataset.id);

        deleteModal.style.display = "flex";
      };
    });
  }

  // ==== SAVE EDIT ====
  saveEdit.onclick = () => {
    const c = contacts.find((x) => x.id === selectedId);

    c.fullName = editName.value;
    c.email = editEmail.value;
    c.phone = editPhone.value;
    c.location = editLocation.value;

    saveToLocal();
    renderContacts();
    editModal.style.display = "none";
  };

  cancelEdit.onclick = () => {
    editModal.style.display = "none";
  };

  // ==== DELETE ====
  confirmDelete.onclick = () => {
    contacts = contacts.filter((x) => x.id !== selectedId);

    saveToLocal();
    renderContacts();
    deleteModal.style.display = "none";
  };

  cancelDelete.onclick = () => {
    deleteModal.style.display = "none";
  };
});
