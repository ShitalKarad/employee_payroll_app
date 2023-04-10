function employee(){
	var name=$('#name').val();
    console.log(name);

    var image = $('input[name="profile"]:checked').val();
  console.log(image);

  var gender = $('input[name="gender"]:checked').val();
  console.log(gender);

  var department = $('input[name="department"]:checked').val();
  console.log(department);

  var salary = $('#salary').val();
  console.log(salary);

  var day = $('#date').val();
  var month = $('#month').val();
  var year = $('#year').val();
  console.log("Start Date = " + day + month + year);

  var note = $('#notes').val();
  console.log(note);

  let requestload = {
    "name": name,
    "profileUrl": image,
    "gender": gender,
    "departMent": department,
    "salary": salary,
    "startDate": day + ' ' + month + ' ' + year,
    "notes": note
  }
  console.log(requestload);

  $.ajax({
    url: 'http://localhost:3000/employee',
    type: 'POST',
    dataType: 'json',
    data: requestload,
    success: function (data, textStatus, xhr) {
      console.log(data);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log('Error in Operation');
    }
  })
}

