let PiP = {};

function switchPicInPic() {
    if (documentPictureInPicture.window) {
        closePicInPic()
    } else {
        openPicInPic()
    }
}

function openPicInPicSafe() {
    if (!documentPictureInPicture.window) {
        openPicInPic();
    }
}

async function openPicInPic() {
    PiP.picInPicWindow = await documentPictureInPicture.requestWindow(PiP.picInPicOpt);
    PiP.picInPicWindow.document.body.append(PiP.picInPicEle);
    PiP.picInPicWindow.addEventListener('unload', finishPicInPIc);

    PiP.picInPicBodyEle = PiP.picInPicWindow.document.body;
    PiP.picInPicBodyEle.setAttribute('style', 'width: 100dvw; height: 100dvh; margin: 0')
    PiP.picInPicEle.setAttribute('style', 'width: 100%; height: 100%')
    PiP.picInPicImgEle.setAttribute('style', 'width: 100%; height: 100%; object-fit: contain; background-color: rbga(0,0,0,0)');
    PiP.picInPicSwitchButtonEle.innerHTML = 'Close Picture-in-Picture'
}

function closePicInPic() {
    PiP.picInPicWindow.close();
}

function finishPicInPIc() {
    PiP.picInPicOuterEle.append(PiP.picInPicEle);
    PiP.picInPicSwitchButtonEle.innerHTML = 'Start Picture-in-Picture'
}

function DOMLoaded() {
    PiP.imgFileReader = new FileReader();
    PiP.imgFileSelectEle = document.querySelector('#img-input');
    PiP.picInPicOuterEle = document.querySelector('#pic-in-pic-outer');
    PiP.picInPicEle = document.querySelector('#pic-in-pic');
    PiP.picInPicImgEle = document.querySelector('#pic-in-pic-img')
    PiP.picInPicSwitchButtonEle = document.querySelector('#switch-pic-in-pic');
    PiP.picInPicOpt = {
        width: Math.min(PiP.picInPicImgEle.clientWidth, window.screen.width),
        height: Math.min(PiP.picInPicImgEle.clientHeight, window.screen.width),
        //initialAspectRatio: PiP.picInPicImgEle.clientWidth/PiP.picInPicImgEle.clientHeight,
        lockAspectRatio: true,
        copyStyleSheets: true};

    PiP.imgFileSelectEle.addEventListener('input', (e) => {PiP.imgFileReader.readAsDataURL(e.target.files[0])});
    PiP.imgFileReader.addEventListener('load', () => {PiP.picInPicImgEle.setAttribute('src', PiP.imgFileReader.result)});
    PiP.picInPicImgEle.addEventListener('load', () => {PiP.picInPicOpt.width = PiP.picInPicImgEle.clientWidth, PiP.picInPicOpt.height = PiP.picInPicImgEle.clientHeight});
    PiP.picInPicSwitchButtonEle.addEventListener('click', switchPicInPic);
    PiP.picInPicImgEle.addEventListener('click', openPicInPicSafe);
}

window.addEventListener('DOMContentLoaded', DOMLoaded);