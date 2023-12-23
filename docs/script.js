let PiP = {};

async function startPicInPic() {
    PiP.picInPic = await documentPictureInPicture.requestWindow(PiP.picInPicOpt);
    PiP.picInPic.document.body.append(PiP.picInPicEle);
    PiP.picInPic.addEventListener('unload', finishPicInPIc);

    PiP.picInPicBodyEle = PiP.picInPic.document.body;
    PiP.picInPicBodyEle.style.margin = 0;
    PiP.picInPicImgEle.setAttribute('style', 'width: 100dvw; height: 100dvh; margin: 0; object-fit: contain; background-color: rbga(0,0,0,0)');
}

function finishPicInPIc() {
    PiP.picInPicOuterEle.append(PiP.picInPicEle);
    PiP.picInPicImgEle.setAttribute('style', 'height: auto')
}

function DOMLoaded() {
    PiP.imgFileSelectEle = document.querySelector('#img-input');
    PiP.picInPicOuterEle = document.querySelector('#pic-in-pic-outer');
    PiP.picInPicEle = document.querySelector('#pic-in-pic');
    PiP.picInPicImgEle = document.querySelector('#pic-in-pic-img')
    PiP.picInPicStartButtonEle = document.querySelector('#start-pic-in-pic');
    PiP.imgFileReader = new FileReader();
    PiP.picInPicOpt = {width: Math.min(PiP.picInPicImgEle.clientWidth, window.screen.width), height: Math.min(PiP.picInPicImgEle.clientHeight, window.screen.width), initialAspectRatio: PiP.picInPicImgEle.clientWidth/PiP.picInPicImgEle.clientHeight, lockAspectRatio: true, copyStyleSheets: true};

    PiP.imgFileSelectEle.addEventListener('input', (e) => {PiP.imgFileReader.readAsDataURL(e.target.files[0])});
    PiP.imgFileReader.addEventListener('load', () => {PiP.picInPicImgEle.setAttribute('src', PiP.imgFileReader.result)});
    PiP.picInPicImgEle.addEventListener('load', () => {PiP.picInPicOpt.width = PiP.picInPicImgEle.clientWidth, PiP.picInPicOpt.height = PiP.picInPicImgEle.clientHeight});
    PiP.picInPicStartButtonEle.addEventListener('click', startPicInPic);
}

window.addEventListener('DOMContentLoaded', DOMLoaded);