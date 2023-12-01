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

  function editEmployee() {

    $('#editEmployeeModal').modal('show');
  }
  function cancelEditedEmployee() {

  $('#editEmployeeModal').modal('hide');
}

function saveEditedEmployee() {
    $('#editEmployeeModal').modal('hide');
}
function deleteRow(icon) {
var row = $(icon).closest('tr');
var confirmDelete = confirm('Bạn có chắc chắn muốn xóa hàng này không?');

if (confirmDelete) {

    row.remove();
}
}

// load all staff from database
$(document).ready(async function() {
    try {
        const res = await fetch('http://localhost:3000/api/admin/user')
        const data = await res.json();
        
        let rsHtml = '';
        data.forEach(function(element){
            let role = "";
            if(element.VaiTro == 1){
                role = "Nhân Viên"
            } else if (element.VaiTro == 2){
                role = "Quản Lý"
            } else if (element.VaiTro == 3){
                role = "Bếp"
            }
            rsHtml += `<tr>
                            <td>${element.UserID}</td>
                            <td>${element.HoTen}</td>
                            <td>${role}</td>
                            <td>${element.Username}</td>
                            <td>
                                <div class="password hide">
                                    ${element.Password}
                                    <i class="fa-solid fa-eye-slash table-item-hide" onclick="toggleContent(this)"></i>
                                </div>
                            </td>
                            <td>
                                <i class="fa-solid fa-pen-to-square color-green table-item-set" onclick="editEmployee()"></i>
                                <i class="fa-solid fa-trash color-red table-item-remove" onclick="deleteRow(this)"></i>
                            </td>
                        </tr>`
        })
        $('tbody').html(rsHtml);
    } catch (error) {
        console.log(error);
    }
});