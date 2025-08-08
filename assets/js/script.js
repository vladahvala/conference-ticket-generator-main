document.addEventListener('DOMContentLoaded', () => {

  const fileInput = document.getElementById('photo-upload');
  const fileSection = document.querySelector('.file-section');
  const uploadBackground = fileSection.querySelector('.upload-background');

  const UploadSubtext = document.querySelector('.upload-subtext');
  const FotoUploaded = document.querySelector('.foto-uploaded');

  const RemoveImgButton = document.getElementById('remove-img');
  const ChangeImgButton = document.getElementById('change-img');

  const Circle = document.querySelector('.circle');
  const CircleI = document.querySelector('.circle-letter');
  const UploadText = document.querySelector('.upload-warning');

  const ErrorCircle = document.querySelector('.circle-error');
  const ErrorCircleI = document.querySelector('.circle-letter-error');
  const ErrorUploadText = document.querySelector('.error-upload');

  const errorCircleEmpty = document.querySelector('.circle-error-empty');
  const errorLetterEmpty = document.querySelector('.circle-letter-error-empty');
  const errorEmptyText = document.querySelector('.error-fileds');

  const errorCircleEmail = document.querySelector('.circle-error-email');
  const errorLetterEmail = document.querySelector('.circle-letter-error-email');
  const errorEmailText = document.querySelector('.error-email');
  const EmailSection = document.getElementById('email-section');

  // Today`s date
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const place = 'Austin, TX';

  function onFileSectionClick() {
    fileInput.click();
  }

  fileSection.addEventListener('click', onFileSectionClick);

  // Uploading image
  fileInput.addEventListener('change', (e) => {
    ErrorCircle.style.display = "none";
    ErrorCircleI.style.display = "none";
    ErrorUploadText.style.display = "none";

    Circle.style.display = "flex";
    CircleI.style.display = "block";
    UploadText.style.display = "block";

    const file = e.target.files[0];

    // Checking whether the image is less then 500KB
    if (file && file.type.startsWith('image/') && file.size <= 500 * 1024) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        uploadBackground.innerHTML = `
          <img src="${ev.target.result}" alt="Uploaded Avatar" class="uploaded-image" />
        `;

        UploadSubtext.style.display = "none";
        FotoUploaded.style.display = "block";

        Circle.style.display = "none";
        CircleI.style.display = "none";
        UploadText.style.display = "none";

        fileSection.removeEventListener('click', onFileSectionClick);
      };
      reader.readAsDataURL(file);

    } else {
      Circle.style.display = "none";
      CircleI.style.display = "none";
      UploadText.style.display = "none";

      ErrorCircle.style.display = "flex";
      ErrorCircleI.style.display = "block";
      ErrorUploadText.style.display = "block";

      fileInput.value = '';
    }
  });

  // Removing uploaded image
  RemoveImgButton.addEventListener('click', () => {
    uploadBackground.innerHTML = `
      <img src="assets/images/icon-upload.svg" alt="upload-image" class="upload-image" />
    `;

    UploadSubtext.style.display = "block";
    FotoUploaded.style.display = "none";

    Circle.style.display = "flex";
    CircleI.style.display = "block";
    UploadText.style.display = "block";

    fileInput.value = '';

    fileSection.addEventListener('click', onFileSectionClick);
  });

  // Changing uploaded image
  ChangeImgButton.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });


  // Checking all the input fields
  document.querySelector('.upload-button').addEventListener('click', (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name-input").value.trim();
    const userEmail = document.getElementById("email-input").value.trim();
    const githubName = document.getElementById("gitname-input").value.trim();
    const file = fileInput.files[0];

    // Hide all the errors before checking
    errorCircleEmpty.style.display = 'none';
    errorLetterEmpty.style.display = 'none';
    errorEmptyText.style.display = 'none';

    errorCircleEmail.style.display = 'none';
    errorLetterEmail.style.display = 'none';
    errorEmailText.style.display = 'none';
    EmailSection.style.borderColor = '#57557d';

    //  Checking whether all the fields are filled 
    if (!fullName || !userEmail || !githubName || !file) {
      errorCircleEmpty.style.display = 'flex';
      errorLetterEmpty.style.display = 'flex';
      errorEmptyText.style.display = 'block';
      return;
    }

    // Checking the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      errorCircleEmail.style.display = 'flex';
      errorLetterEmail.style.display = 'flex';
      errorEmailText.style.display = 'block';
      EmailSection.style.borderColor = '#f36f5c';
      return;
    }

    // Downloading the ticket
    const mainSection = document.querySelector('.main-section');
    const ticketSection = document.querySelector('.ticket-section');

    const ticketInfo = document.querySelector('.ticket-text');

    mainSection.style.display = 'none';
    ticketSection.style.display = 'flex';

    const TitleName = document.querySelector('.title-name');
    const TicketName = document.querySelector('.info-name');
    const TitleUsername = document.querySelector('.title-username');
    const InfoGithubname = document.querySelector('.info-username');
    const ImageTicket = document.querySelector('.image-ticket');

    TitleName.textContent = fullName;
    TicketName.textContent = fullName;
    ticketInfo.textContent = `${formattedDate} / ${place}`;
    TitleUsername.textContent = userEmail;
    InfoGithubname.textContent = `@${githubName}`

    const reader = new FileReader();
    reader.onload = function (e) {
      ImageTicket.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

