const emailImage = document.getElementById("email");
const content2Class = document.getElementById("content2");
const replyButton = document.getElementById("reply");
const sendButton = document.getElementById("send")
const serviceId = "service_uw9zxa6";
const templateId = "template_1od4gjc"
const audio = new Audio("you.mp3");
let i = 0;
let txt = 'Dear Sahabat, \n\nKepada Temanku\nLorem ipsum dolor sit amet consectetur adipisicing elit. Cum ipsa quas rerum odio, consequatur facere ipsum, provident non facilis tempore ratione sunt nulla nostrum beatae repellendus omnis commodi accusamus reprehenderit excepturi sequi earum voluptatem totam. Officia, quo! Vero repellendus eius perferendis doloremque reiciendis consectetur, error recusandae numquam ducimus quae porro!\n\nTertanda\nMuhammad Fathul Falah';
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
