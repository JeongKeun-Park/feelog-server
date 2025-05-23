noticeService.getList(noticeLayout.showNotice);

const search = document.querySelector(".search-input");
const button = document.querySelector(".search-button");
const noticeButtons = document.querySelectorAll(".noticeButtons")
let changeTitle = null
let changeContent = null
let defaultTitle = null
let defaultContent = null

modal.addEventListener("change", (e) => {
    console.log(e.target.files)
    const files = e.target.files[0]; // FileList 객체

    const formData = new FormData();
    formData.append("file", files);
    // 서버로 전송하여 path와 썸네일 생성
    inputFileUpload(formData);
});

htmlWrap.addEventListener("click", async (e) => {
    if (e.target.classList.contains("noticeButtons")) {
        await noticeService.getList(noticeLayout.noticeButtonEvent, e.target.getAttribute("data-index"));
    }

    if (e.target.classList.contains("noticeRegistBtn")) {
        modal.style.display = "flex";
        modal.innerHTML = `
        <div class="notice-modal">
            <div class="modal-header">
                <span> 공지 등록 </span>
                <span class="closeNoticeModal">×</span>
            </div>
            <div class="notice-container">
                <div class="notice-title-container border-box">
                    <div class="noticeModal-TitleDiv">제목</div>
                    <textarea class="noticeModal-TitleInput noticeTitle"></textarea>
                </div>
                <div class="notice-content-container border-box">
                    <div class="noticeModal-ContentDiv">내용</div>
                    <textarea class="noticeModal-ContentInput noticeContent"></textarea>
                    <div class="ImageList-sc-9v1mt2-0 hGJMVS">
                    </div>
                </div>
                <div class="notice-button-container">
                    <label class="InputImageReview__Wrapper-sc-1oapt4s-0 ipbuZD">
                        <input type="file" accept=".jpg, .jpeg, .png" class="add-img">
                        <span> 사진 첨부하기</span>
                    </label>
                    <button class="confirmBtn noticeConfirmBtn noticeWrite">공지등록</button>
                </div>             
            </div>
        </div>
        `;
    }

    if (e.target.closest(".noticeListDiv")) {
        const parent = e.target.closest(".noticeListDiv")
        const id = parent.querySelector(".idDiv")
        const title = parent.querySelector(".titleDiv")
        const content = parent.querySelector(".contentDiv")
        const filePath = parent.querySelector(".filePathDiv");
        const fileName = parent.querySelector(".fileNameDiv");

        modal.style.display = "flex";
        modal.innerHTML = `
        <div class="notice-modal">
            <div class="modal-header">
                <span> 공지 상세 </span>
                <span class="closeNoticeModal">&times;</span>
            </div>
            <div class="notice-container">
                <div class="notice-title-container border-box">
                    <div class="noticeModal-TitleDiv" data-index=${id.innerText}>Title</div>
                    <textarea class="noticeModal-TitleInput">${title.innerText}</textarea>
                </div>
                <div class="notice-content-container border-box">
                    <div class="noticeModal-ContentDiv">Contents</div>
                    <textarea class="noticeModal-ContentInput">${content.innerText.trim()}</textarea>
                    <div class="ImageList-sc-9v1mt2-0 hGJMVS"></div>
                </div>
                <div class="notice-button-container">
                    <label class="InputImageReview__Wrapper-sc-1oapt4s-0 ipbuZD">
                        <input type="file" accept=".jpg, .jpeg, .png" class="add-img">
                        <span> 사진 첨부하기</span>
                    </label>
                    <button class="updateBtn noticeUpdateBtn">공지 수정</button>
                    <button class="deleteBtn noticeDeleteBtn" data-index=${id.innerText}>공지 삭제</button>
                </div>
            </div>
        </div>
        `;

        if (filePath.textContent.trim() !== "null" && fileName.textContent.trim() !== "null") {
            const encodedFilePath = encodeURIComponent(`${filePath.textContent.trim()}/${fileName.textContent.trim()}`);   // 이미지 파일이 아닌경우 별도의 이미지 파일 제공
            const imgWrap = document.querySelector(".hGJMVS")
            imgWrap.innerHTML = `
            <div class="ImageList__ImageWrapper-sc-9v1mt2-1 kZTsQf">
                <div class="Image__Wrapper-v97gyx-0 gDuKGF uploadFile"
                data-file-name="${fileName.textContent.trim()}" data-file-path="${filePath.textContent.trim()}">
                    <div class="Ratio " style="display: block;">
                        <div class="Ratio-ratio " style="height: 0px; position: relative; width: 100%; padding-top: 50%;">
                            <div class="Ratio-content " style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;">
                            <img src="/files/display?path=${encodedFilePath}" class="hVNKgp">
                            </div>
                        </div>
                    </div>
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero'%3E %3Cpath fill='%23FFF' fill-opacity='0' d='M0 0h18v18H0z'/%3E %3Cg stroke='%23FFF' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E" class="ImageList__IconDelete-sc-9v1mt2-2 benIbu">
                </div>
            </div>
            `;
        }

        const updateTitle = document.querySelector(".noticeModal-TitleInput");
        const updateContent = document.querySelector(".noticeModal-ContentInput");
        defaultTitle = updateTitle.value
        defaultContent = updateContent.value
    }
});


modal.addEventListener("input", (e) => {
    if (e.target.classList.contains("noticeModal-TitleInput")) {
        changeTitle = document.querySelector(".noticeModal-TitleInput").value;
    }
    if (e.target.classList.contains("noticeModal-ContentInput")) {
        changeContent = document.querySelector(".noticeModal-ContentInput").value;
    }
})


modal.addEventListener("click", async (e) => {
    if (e.target.classList.contains("noticeWrite")) {
        const titleText = document.querySelector(".noticeTitle");
        const content = document.querySelector(".noticeContent");
        const uploadFile = document.querySelector(".uploadFile");

        if (titleText.value === "") {
            alert("제목을 입력해주세요")
            return;
        }
        if (content.value === "") {
            alert("내용을 입력해주세요")
            return;
        }

        if (uploadFile) {
            const fileName = uploadFile.getAttribute("data-file-name");
            const filePath = uploadFile.getAttribute("data-file-path");
            await noticeService.addNotice({
                noticeTitle: titleText.value,
                noticeContent: content.value,
                noticeFilePath: filePath,
                noticeFileName: fileName,
                memberId: loginMember.id //로그인 적용 후 로그인한 관리자 id로 변환
            })
        } else {
            await noticeService.addNotice({
                noticeTitle: titleText.value,
                noticeContent: content.value,
                memberId: loginMember.id //로그인 적용 후 로그인한 관리자 id로 변환
            })
        }


        alert("등록완료")

        document.querySelector(".admin-modal-body").innerHTML = ``;
        document.querySelector(".admin-modal-body").style.display = "none";

        await noticeService.getList(noticeLayout.noticeButtonEvent, 1);
    }

    if (e.target.classList.contains("noticeUpdateBtn")) {
        const uploadFile = document.querySelector(".uploadFile");
        const noticeTitle = modal.querySelector(".noticeModal-TitleInput");
        const noticeContent = modal.querySelector(".noticeModal-ContentInput");
        console.log(noticeTitle)
        console.log(noticeContent)
        console.log(noticeTitle.value)
        console.log(noticeContent.value)
        console.log(uploadFile)
        const id = document.querySelector(".noticeModal-TitleDiv").getAttribute("data-index");

        if (uploadFile) {
            const fileName = uploadFile.getAttribute("data-file-name");
            const filePath = uploadFile.getAttribute("data-file-path");

            await noticeService.update({
                id: id,
                noticeTitle: noticeTitle.value,
                noticeContent: noticeContent.value,
                noticeFileName: fileName,
                noticeFilePath: filePath
            })
        } else {
            await noticeService.update({
                id: id,
                noticeTitle: noticeTitle.value,
                noticeContent: noticeContent.value
            })
        }

        alert("수정완료")
        document.querySelector(".admin-modal-body").innerHTML = ``;
        document.querySelector(".admin-modal-body").style.display = "none";

        await noticeService.getList(noticeLayout.noticeButtonEvent, 1);

    }

    if (e.target.classList.contains("noticeDeleteBtn")) {
        const id = document.querySelector(".noticeModal-TitleDiv").getAttribute("data-index");

        await noticeService.deleteNotice(id);

        alert("삭제완료")
        document.querySelector(".admin-modal-body").innerHTML = ``;
        document.querySelector(".admin-modal-body").style.display = "none";

        await noticeService.getList(noticeLayout.noticeButtonEvent, 1);
    }

});

