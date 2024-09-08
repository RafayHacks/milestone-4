function toggleSection(id) {
    var section = document.getElementById(id);
    if (section.classList.contains('show')) {
        section.classList.remove('show');
    } else {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(function(sec) {
            sec.classList.remove('show');
        });
        // Show the clicked section
        section.classList.add('show');
    }
}    document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('image-upload');
    const profileImage = document.getElementById('profile-image');
    const generatePdfButton = document.getElementById('generate-pdf');
    let imageDataURL = null;

    if (profileImageInput) {
        profileImageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (profileImage) {
                        profileImage.src = e.target.result;
                    }
                    imageDataURL = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const fields = [
                'full-name', 'phone-number', 'email', 'city',
                'degree', 'institution', 'year', 'job-title',
                'company-name', 'duration', 'skill1', 'skill2', 'skill3'
            ];

            let allFilled = true;
            fields.forEach(id => {
                const value = document.getElementById(id).value.trim();
                if (!value) {
                    allFilled = false;
                }
            });

            if (!allFilled) {
                alert('Please fill out all fields before generating the PDF.');
                return;
            }

            if (imageDataURL) {
                doc.addImage(imageDataURL, 'PNG', 10, 10, 50, 50);
            }

            doc.setFontSize(18);
            doc.text('Resume', 10, 70);
            doc.setFontSize(12);
            doc.text(Name: ${document.getElementById('full-name').value}, 10, 80);
            doc.text(Contact: ${document.getElementById('phone-number').value}, 10, 90);
            doc.text(Email: ${document.getElementById('email').value}, 10, 100);
            doc.text(City: ${document.getElementById('city').value}, 10, 110);
            doc.text('Education', 10, 120);
            doc.text(Degree: ${document.getElementById('degree').value}, 10, 130);
            doc.text(Institution: ${document.getElementById('institution').value}, 10, 140);
            doc.text(Year of Graduation: ${document.getElementById('year').value}, 10, 150);
            doc.text('Experience', 10, 160);
            doc.text(Job Title: ${document.getElementById('job-title').value}, 10, 170);
            doc.text(Company: ${document.getElementById('company-name').value}, 10, 180);
            doc.text(Duration: ${document.getElementById('duration').value}, 10, 190);
            doc.text('Skills', 10, 200);
            doc.text(Skills: ${document.getElementById('skill1').value}, ${document.getElementById('skill2').value}, ${document.getElementById('skill3').value}, 10, 210);

            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);

            const pdfViewer = document.getElementById('pdf-viewer');
            if (pdfViewer) {
                pdfViewer.innerHTML = ''; // Clear previous content
                const iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.width = '100%';
                iframe.height = '500px'; // Adjust height as needed
                pdfViewer.appendChild(iframe);
            }

            const existingViewButton = document.getElementById('view-button');
            if (existingViewButton) {
                existingViewButton.remove();
            }
            const existingDownloadButton = document.getElementById('download-button');
            if (existingDownloadButton) {
                existingDownloadButton.remove();
            }

            const viewButton = document.createElement('button');
            viewButton.id = 'view-button';
            viewButton.className = 'btn btn-success';
            viewButton.textContent = 'View PDF Live';
            viewButton.onclick = () => {
                const pdfBlob = doc.output('blob');
                const url = URL.createObjectURL(pdfBlob);
                window.open(url, '_blank');
            };

            const downloadButton = document.createElement('button');
            downloadButton.id = 'download-button';
            downloadButton.className = 'btn btn-primary';
            downloadButton.textContent = 'Download PDF';
            downloadButton.onclick = () => {
                doc.save('resume.pdf');
            };

            document.body.appendChild(viewButton);
            document.body.appendChild(downloadButton);
        });
    }
});

function toggleSection(id) {
    var section = document.getElementById(id);
    if (section.classList.contains('show')) {
        section.classList.remove('show');
    } else {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(function(sec) {
            sec.classList.remove('show');
        });
        // Show the clicked section
        section.classList.add('show');
    }
}