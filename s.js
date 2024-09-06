const emailImage = document.getElementById("email");
const content2Class = document.getElementById("content2");
const replyButton = document.getElementById("reply");
const sendButton = document.getElementById("send")
const serviceId = "service_uw9zxa6";
const templateId = "template_1od4gjc"
const audio = new Audio("you.mp3");
let i = 0;
let txt = 'Dear Nara, \n\nKepada yang terhormat tuan putri ndoro kanjeng ratu yang paling cantik,\nSelamat Ulang tahun yang ke-18 yaa,\nciee samaan kita jadi nya.\nSemoga di umur kamu yang udah legal untuk melakukan apapun di negara ini kamu tetap bisa jaga diri kamu sendiri ya, kamu gak ikut-ikutan pergaulan yang gak seharusnya kamu ikutin,\nkamu udah tau lah mana yang baik mana yang buruk, udah gede kan?😊\nSemoga semua keinginan kamu bisa terkabul,\nbisa lebih kenceng lagi ibadah nya sama tuhan.\nKalau semisal kamu pengen cerita tapi gak bisa kamu ceritain ke aku, atau temen kamu, cerita nya ke Allah aja, dia pasti dengerin dan inget semua keluhan kamu kok.\nDan gak cuma itu, kalau kamu curhat nya sama yang diatas langsung pasti langsung ada solusi nya, kamu harus percaya itu yaa...\nDan ya mungkin gak banyak yang bisa aku kasih, cuma sekedar karya recehan kayak gini mungkin gak akan terlalu berkesan buat kamu, maaf yaa...\nHmm... Nulis apalagi yak?? capekk...\nAku cerita aja kali yak?\nTapi aku takut kamu bosen...\nGini aja deh, gimana kalau semisal kamu emang pengen tau cerita ku kita main teka-teki aja?\nKalau mau liat cerita ku, kamu tinggal wa ke aku trus teks nya "minta kode teka-teki nya"\ntapi kalau gak mau juga gakpapa\nmendingan gak usah, pasti kamu bosen nanti.\nSekali lagi...\nSelamat Ulang tahun araa...🥳🥳\n4x4 sama dengan 16\nsempat tidak sempat haruslah dibalas\nterima kasih...\n\n\n*Yang paling atas itu ucapan nya setaun sekali aja ya, aku sebenarnya malu makanya gak ush ketawa\n\n\n*Selesai dikerjakan jam 01:24 dini hari\n\n\n Tertanda\nMuhammad Fathul Falah';
let speed = 90;
emailImage.addEventListener("click", () => {
	content2Class.style.display = "block"
    audio.play()
	setTimeout(() => {
		typeWriter()
	}, 1000);
})

function typeWriter() {
    if (i < txt.length) {
        const textArea = document.querySelector("textarea");
        textArea.innerHTML += txt.charAt(i);
        textArea.scrollTop = textArea.scrollHeight; // Scroll otomatis ke bawah
        i++;
        setTimeout(typeWriter, speed);
    } else {
        replyButton.style.display = "block";
        startConfetti();
        stopConfetti();
    }
}


replyButton.addEventListener('click', () => {
    const textArea = document.querySelector("textarea")
    textArea.innerText = " "
    textArea.disabled = false
    textArea.focus()
    replyButton.style.display = "none"
    sendButton.style.display = "block"
})
const startConfetti = () => {
    setTimeout(function() {
        confetti.start()
    }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};
const stopConfetti = () => {
    setTimeout(function() {
        confetti.stop()
    }, 7000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

sendButton.addEventListener('click', () => {
    const textArea = document.querySelector("textarea").value
    console.log(textArea);
    
    const inputFields = {
        from_name: "Nara",
        message : textArea
    }
    sendEmail(inputFields)
})

const sendEmail = ( content) => {
   

    emailjs
    .send(
      serviceId,
      templateId,
      content
    )
    .then (
      () => {
        alert('Your Message has been sent to Fathul Falah')
        window.location.reload()
      },
      () => {
        alert('Failed to send message, please try again or contact via whatsapp')
      }
    )
  }