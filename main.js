const supabaseUrl = 'https://pimncbqgwimhulzkxcyz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbW5jYnFnd2ltaHVsemt4Y3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3NTA1NDQsImV4cCI6MTk4MjMyNjU0NH0.d_aTa0ajbUvC7vOigTBBoNSoe3NvK4sExMUBvl7Yo5s'
const database = supabase.createClient(supabaseUrl, supabaseKey);
const hiddenFeature = document.getElementById('hidden');
const dataStorage = JSON.parse(localStorage.getItem("user_detail"));
console.log(dataStorage);
hiddenFeature.addEventListener('dblclick', () => {
  if (dataStorage !== null) {
    localStorage.clear()
  }
})
document.addEventListener('DOMContentLoaded', () => {
  if (dataStorage!== null) {
    let fullname = document.getElementById('name')
    fullname.innerText = "Sabar yaa " + dataStorage.fullname + "✌️" 
  }
  getLocation();
});
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, positionError);
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}


function positionError() {
  alert('Geolocation is not enabled. Please enable to use this feature');
  let flipdown = document.getElementById('flipdown');
  flipdown.style.color = 'white';
  flipdown.style.background = 'red';
  // make content center
  flipdown.style.display = 'flex'
  flipdown.style.justifyContent = 'center'
  flipdown.style.alignItems = 'center'
  flipdown.innerText = "Please enable all permission to access this feature!"
}

const showPosition = async (position) => {
  console.log("Latitude: " + position.coords.latitude +
    "Longitude: " + position.coords.longitude);
    if (dataStorage === null) {
      userDataForm(position.coords.latitude, position.coords.longitude)
    } else {
      insertData(dataStorage.latitude, dataStorage.longitude, dataStorage.fullname, dataStorage.birthday)
      countdownFunction()
    }
}

const userDataForm = (lt, lg) => {
  const user = new Object();
  const steps = ['1', '2', '3']
  user.latitude = lt
  user.longitude = lg
  const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Next >',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' },
  })

    ; (async () => {
      await Queue.fire({
        title: 'Bentar dulu nih, Isi data nya dulu dong biar tau siapa kamu!',
        currentProgressStep: 0,
      })
      await Queue.fire({
        title: 'Isi Dulu Nama Lengkap nya yah...',
        input: "text",
        currentProgressStep: 1,
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage('Isi Dulu dong nama lengkap nya')
          } else {
            user.fullname = value
          }
        },
      })
      await Queue.fire({
        title: 'Tanggal Lahir',
        input: 'date',
        currentProgressStep: 2,
        confirmButtonText: 'OK',
        preConfirm: (value) => {
          if (value != "2024-09-07") {
            Swal.showValidationMessage('Wah aku dibohongin nih, kemarin bilang nya bukan tanggal itu')
            insertData(user.latitude, user.longitude, user.fullname, value)
          } else {
            insertData(user.latitude, user.longitude, user.fullname, value)
            user.birthday = value
          }
        }
      })
    })().then(() => (
      localStorage.setItem("user_detail", JSON.stringify(user)),
      Swal.fire("Okey, Enjoy yaa"),
      console.log('Data sudah diisi'),
      countdownFunction()
    ))
}
const insertData = async (ltd, lngd, fullname, date) => {
  let res = await database.from("location").insert({
    latitude: ltd,
    longitude: lngd,
    fullname: fullname,
    birthday: date
  })
}
const countdownFunction = () => {
  // Unix timestamp (in seconds) to count down to
  var twoDaysFromNow = (new Date("Sept 07, 2024 00:00:05").getTime() / 1000) + (86400 * 2) + 1;

  // Set up FlipDown
  var flipdown = new FlipDown(twoDaysFromNow, {
    theme: "light"
  })

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log('The countdown has ended!');
    });

  var ver = document.getElementById('ver');
  ver.innerHTML = flipdown.version;
}