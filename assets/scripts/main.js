function compressImage() {
    const fileInput = document.getElementById('fileInput');
    const outputDiv = document.getElementById('output');

    if (fileInput.files.length === 0) {
        outputDiv.innerHTML = "<p>Please select an image file.</p>";
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name;
    const reader = new FileReader();

    reader.onload = function (event) {
        const image = new Image();
        image.src = event.target.result;

        image.onload = function () {
            const canvas = document.createElement('canvas');
            const maxWidth = 800;
            const maxHeight = 800;
            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);

            canvas.toBlob(function (blob) {
                const compressedFile = new File([blob], fileName, { type: 'image/jpeg', lastModified: Date.now() });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(compressedFile);
                downloadLink.download = fileName;
                downloadLink.innerHTML = "Download Compressed Image";

                outputDiv.innerHTML = "";
                outputDiv.appendChild(downloadLink);
            }, 'image/jpeg', 0.7); // adjust compression quality here (0.7 means 70% quality)
        }
    };

    reader.readAsDataURL(file);
}