function toggleContent(icon) {
  var row = icon.closest('tr');
  var cells = row.getElementsByTagName('td');

  if (row.classList.contains('hidden-content')) {
    for (var i = 0; i < cells.length - 1; i++) {
      //cells[i].textContent = 'Original Text';
    }
    row.classList.remove('hidden-content');
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  } else {
    for (var i = 0; i < cells.length - 1; i++) {
      //cells[i].textContent = '*****';
    }
    row.classList.add('hidden-content');
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
}
function addEmployee() {

  $('#addEmployeeModal').modal('show');
}
function cancelAddEmployee() {

  $('#addEmployeeModal').modal('hide');
}

function saveAddEmployee() {

  $('#addEmployeeModal').modal('hide');

}

async function editEmployee(userID) {
  const res = await fetch(`http://localhost:3000/api/admin/user/edit/?id=${userID}`)
  const user = await res.json();
  let role = "";
  if (user.VaiTro == 1) {
    role = "employee"
  } else if (user.VaiTro == 2) {
    role = "manager"
  } else if (user.VaiTro == 3) {
    role = "chef"
  }
  $("#editEmployeeModal #editEmployeeCode").val(user.UserID);
  $("#editEmployeeModal #editEmployeeName").val(user.HoTen);
  $("#editEmployeeModal #editEmployeeRole").val(user.VaiTro);
  $("#editEmployeeModal #editEmployeeUser").val(user.Username);
  // $("#editEmployeeModal #editEmployeePassword").val(user.Password);
  $('#editEmployeeModal').modal('show');
}
function cancelEditedEmployee() {

  $('#editEmployeeModal').modal('hide');
}

function saveEditedEmployee() {
  $('#editEmployeeModal').modal('hide');
}
async function deleteRow(userID) {
  // var row = $(icon).closest('tr');
  var confirmDelete = confirm('Bạn có chắc chắn muốn xóa hàng này không?');

  if (confirmDelete) {
    await fetch(`http://localhost:3000/api/admin/user/delete/?id=${userID}`)
    window.location.href = 'http://127.0.0.1:5500/FrontEnd/Admin/staff.html';
    // row.remove();
  }
}

// load all staff from database
$('#pagination-container').pagination({
  dataSource: 'http://localhost:3000/api/admin/user/read?page=1',
  locator: 'data',
  totalNumberLocator: function (response) {
    return response.total;
  },
  pageSize: 4,
  afterPageOnClick: function (event, pageNumber) {
    loadPage(pageNumber);
  },
  afterPreviousOnClick: function (event, pageNumber) {
    loadPage(pageNumber);
  },
  afterNextOnClick: function (event, pageNumber) {
    loadPage(pageNumber);
  },
});
loadPage(1);

document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const searchValue = document.getElementById('searchInput').value;
  loadPageSearch(1, searchValue);
  if (searchValue) {
    $('#pagination-container').pagination({
      dataSource: `http://localhost:3000/api/admin/user/search?name=${searchValue}&page=1`,
      locator: 'result.data',
      totalNumberLocator: function (response) {
        return response.result.total;
      },
      pageSize: 4,
      afterPageOnClick: function (event, pageNumber) {
        loadPageSearch(pageNumber, searchValue);
      },
      afterPreviousOnClick: function (event, pageNumber) {
        loadPageSearch(pageNumber, searchValue);
      },
      afterNextOnClick: function (event, pageNumber) {
        loadPageSearch(pageNumber, searchValue);
      },
    });
    loadPageSearch(1, searchValue);
  } else {
    loadPage(1);
    $('#pagination-container').pagination({
      dataSource: 'http://localhost:3000/api/admin/user/read?page=1',
      locator: 'data',
      totalNumberLocator: function (response) {
        return response.total;
      },
      pageSize: 4,
      afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
      },
      afterPreviousOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
      },
      afterNextOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
      },
    });
  }
});



function loadPageSearch(page, searchValue) {
  const tableBody = $('.table tbody');
  tableBody.empty();

  $.ajax({
    url: `http://localhost:3000/api/admin/user/search?name=${searchValue}&page=${page}`,
  })
    .then(result => {
      console.log(result.result.data);
      displayData(result.result.data);
    })
    .catch(err => {
      console.log('Error from server:', err);
    });
}

function displayData(displayedData) {
  const tableBody = $('.table tbody');
  tableBody.empty();


  if (Array.isArray(displayedData)) {
    for (let i = 0; i < displayedData.length; i++) {
      let element = displayedData[i];
      let role = "";

      if (element.VaiTro == 1) {
        role = "Nhân Viên";
      } else if (element.VaiTro == 2) {
        role = "Quản Lý";
      } else if (element.VaiTro == 3) {
        role = "Bếp";
      }

      const rowHtml = `<tr>
      <td>${element.UserID}</td>
      <td>${element.HoTen}</td>
      <td>${role}</td>
      <td>${element.Username}</td>
      <td>
        <i class="fa-solid fa-pen-to-square color-green table-item-set" onclick="editEmployee(${element.UserID})"></i>
        <i class="fa-solid fa-trash color-red table-item-remove" onclick="deleteRow(${element.UserID})"></i>
      </td>
    </tr>`;

      tableBody.append(rowHtml);
    }
  } else {
    console.error('displayedData is not an array:', displayedData);
  }
}
function loadPage(page) {
  const tableBody = $('.table tbody');
  tableBody.empty();
  $.ajax({
    url: 'http://localhost:3000/api/admin/user/read?page=' + page,
  })
    .then(result => {
      displayData(result.data);
    })
    .catch(err => {
      console.log('Error from server:', err);
    });
}
