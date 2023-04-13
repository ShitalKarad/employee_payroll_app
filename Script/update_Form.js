const setValues = (id, value) => {
    document.getElementById(id).textContent = value
}

const setTextValue = (id, value) => {
    document.getElementById(id).value = value
}

const selectSelected = (prop, value) => {
    let allItems = document.querySelectorAll(prop);
    allItems.forEach(item => {
        if (Array.isArray(value) && value.includes(item.value)) {
            item.checked = true
        } else if (value.includes(item.value)) {
            item.checked = true;
        }

    })
}

const stringifyDate = (date)=>{
    const options = {day: "numeric", month: "short", year: "numeric"}
    const newDate = ! date ? undefined : new Date(Date.parse(date)).toLocaleDateString('en-GB', options)
    return newDate;
}

$(function () {

    $.ajax({
        url: 'http://localhost:3000/employee/' + localStorage.getItem('id'),
        type: 'GET',
        dataType: 'json',
        success: function (empData) {
            setTextValue("name", empData.name);
            setValues("notes", empData.notes);
            setValues("mysalary", empData.salary)
            let date = stringifyDate(empData.startDate).split(" ")
            setTextValue("date", date[0]);
            setTextValue("month", date[1]);
            setTextValue("year", date[2]);
            selectSelected("[name=profile", empData.profileUrl)
            selectSelected("[name=gender", empData.gender)
            selectSelected("[name=department", empData.departMent)
            // salary.textContent = empData.salary;
            // setTextValue("salary", empData.salary);
        }
    })

});

function updateEmployee() {
    var name = $('#name').val();
    console.log(name);

    var image = $('input[name="profile"]:checked').val();
    console.log(image);

    var gender = $('input[name="gender"]:checked').val();
    console.log(gender);

    var department = $('input[name="department"]:checked').val();
    console.log(department);

    var salary = $('#mysalary').val();
    console.log(salary);

    var day = $('#date').val();
    var month = $('#month').val();
    var year = $('#year').val();
    console.log("Start Date = " + day + month + year);

    var note = $('#notes').val();
    console.log(note);

    let updateObj = {
        "name": name,
        "profileUrl": image,
        "gender": gender,
        "departMent": department,
        "mysalary": salary,
        "startDate": day + ' ' + month + ' ' + year,
        "notes": note
    }
    console.log(updateObj);

    $.ajax({
        url: 'http://localhost:3000/employee/' + localStorage.getItem('id'),
        type: 'PUT',
        dataType: 'json',
        data: updateObj,
        success: function (data, textStatus, xhr) {
            console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    })

}