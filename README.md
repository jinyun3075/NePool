# <span id="top">πNEPOOL</span>
[π www.nepool.co.kr](http://www.nepool.co.kr)

[π API λͺμΈ](https://github.com/jinyun3075/NePool/tree/main/BackEnd)


## νμ κ΅¬μ±

- π μ§μ€μ¬ π[github/jinyun3075](https://github.com/jinyun3075)
- ππ»ββοΈ μ μμ°¬ π[github/sichan1301](https://github.com/sichan1301)
- ππ»ββοΈ μ΅μ±μ΄ π[github/choisung2](https://github.com/choisung2)
- ππ»β μ νμΈ π[github/Mangopapa1](https://github.com/Mangopapa1)

<details>
<summary>λͺ©μ°¨</summary>

1. [νλ‘μ νΈ λͺ©ν](#goal)
2. [κ°λ° νκ²½ λ° λ°°ν¬ URL](#dev)
3. [νλ‘μ νΈ κ΅¬μ‘°](#tree)
4. [μ­ν  λΆλ΄](#role)
5. [κ°λ° κΈ°κ° λ° μ΄μ κ΄λ¦¬](#task)
6. [UI](#ui)
7. [νμ΄μ§ κΈ°λ₯](#pages)

</details>

***

## <span id="goal">1. νλ‘μ νΈ λͺ©ν</span>
- λ΄κ° νλ €κ³  λ§λλ λ¬Έμ μ§ νλ‘μ νΈ μλλ€.
- λ¬Έμ μ§, λ¬Έμ λ₯Ό μμ λ‘­κ² λ§λ€κ³  νμ΄λ³Ό μ μμ΅λλ€. 
- λ¬Έμ μ§μ κ³΅μ νκ³  λ€λ₯Έ μ¬μ©μκ° κ³΅μ ν λ¬Έμ μ§μ μ€ν¬λ© ν  μ μμ΅λλ€.
- κ³΅λΆλͺ¨λ, μνλͺ¨λλ‘ κ΅¬λ³νμ¬ μ¬μ©μμ μν©μ λ§κ² νμ΄λ³Ό μ μμ΅λλ€.

<p align="right"><a href="#top">(Top)</a></p>

## <span id="dev">2. κ°λ° νκ²½ λ° λ°°ν¬ URL</span>
### κ°λ° νκ²½
- Front : HTML, CSS, React JS
- Back : Spring Framwork, My SQL
- DevOps: Github, Docker, AWS
- Design: Figma
- λ²μ  κ΄λ¦¬ λ° μ΄μ : π[GitHub Project](https://github.com/jinyun3075/NePool/projects/1)

<p align="right"><a href="#top">(Top)</a></p>

## <span id="tree">3. νλ‘μ νΈ κ΅¬μ‘°</span>

<details>

```bash
\---NePool
    |   .dockerignore
    |   .gitignore
    |   README.md
    |
    +---BackEnd
    |   |   build.gradle
    |   |   Dockerfile
    |   |   README.md
    |   |
    |   \---src
    |       +---java
    |       |   |   NePoolServerApplication.java
    |       |   |
    |       |   +---controller
    |       |   |       AnnouncementApiController.java
    |       |   |       CommentApiController.java
    |       |   |       GoogleApiController.java
    |       |   |       SearchApiController.java
    |       |   |       ShareWorkBookApiController.java
    |       |   |       UploadApiController.java
    |       |   |       UserApiController.java
    |       |   |       WorkApiController.java
    |       |   |       WorkBookApiController.java
    |       |   |
    |       |   +---domain
    |       |   |   +---announcement
    |       |   |   |   +---dto
    |       |   |   |   |       AnnouncementDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       Announcement.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           AnnouncementRepository.java
    |       |   |   |
    |       |   |   +---comment
    |       |   |   |   +---dto
    |       |   |   |   |       CommentRequestDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       Comment.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           CommentRepository.java
    |       |   |   |
    |       |   |   +---shareworkbook
    |       |   |   |   +---dto
    |       |   |   |   |       ShareWorkBookDTO.java
    |       |   |   |   |       ShareWorkBookResultDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       ShareWorkBook.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           ShareWorkBookRepository.java
    |       |   |   |
    |       |   |   +---user
    |       |   |   |   +---dto
    |       |   |   |   |       GoogleLoginDTO.java
    |       |   |   |   |       UserDTO.java
    |       |   |   |   |       UserLoginDTO.java
    |       |   |   |   |       UserLoginRequestDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       NePoolUser.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           UserRepository.java
    |       |   |   |
    |       |   |   +---work
    |       |   |   |   +---dto
    |       |   |   |   |       WorkDTO.java
    |       |   |   |   |       WorkResultRealResponseDTO.java
    |       |   |   |   |       WorkResultRequestDTO.java
    |       |   |   |   |       WorkResultResponseDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       Work.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           WorkRepository.java
    |       |   |   |
    |       |   |   \---workbook
    |       |   |       +---dto
    |       |   |       |       WorkBookRequestDTO.java
    |       |   |       |
    |       |   |       +---entity
    |       |   |       |       WorkBook.java
    |       |   |       |
    |       |   |       \---repository
    |       |   |               WorkBookRepository.java
    |       |   |
    |       |   +---exception
    |       |   |       ErrorHandle.java
    |       |   |
    |       |   +---security
    |       |   |   |   CorsConfig.java
    |       |   |   |   SecurityConfig.java
    |       |   |   |
    |       |   |   +---dto
    |       |   |   |       NePoolAuthDTO.java
    |       |   |   |
    |       |   |   +---filter
    |       |   |   |       ApiCheckFilter.java
    |       |   |   |       ApiLoginFilter.java
    |       |   |   |
    |       |   |   +---handler
    |       |   |   |       ApiLoginFailHandler.java
    |       |   |   |
    |       |   |   \---service
    |       |   |           NePoolUserDetailsService.java
    |       |   |
    |       |   +---service
    |       |   |   |   AnnouncementService.java
    |       |   |   |   CommentService.java
    |       |   |   |   SearchService.java
    |       |   |   |   ShareWorkBookService.java
    |       |   |   |   UploadService.java
    |       |   |   |   UserService.java
    |       |   |   |   WorkBookService.java
    |       |   |   |   WorkService.java
    |       |   |   |
    |       |   |   \---impl
    |       |   |           AnnouncementServiceImpl.java
    |       |   |           CommentServiceImpl.java
    |       |   |           SearchServiceImpl.java
    |       |   |           ShareWorkBookServiceImpl.java
    |       |   |           UploadServiceImpl.java
    |       |   |           UserServiceImpl.java
    |       |   |           WorkBookServiceImpl.java
    |       |   |           WorkServiceImpl.java
    |       |   |
    |       |   \---util
    |       |       +---dto
    |       |       |       ErrorResult.java
    |       |       |       PageRequestDTO.java
    |       |       |       PageResultDTO.java
    |       |       |       SearchDTO.java
    |       |       |       UploadResultDTO.java
    |       |       |
    |       |       +---entity
    |       |       |       BaseEntity.java
    |       |       |       UserRole.java
    |       |       |       
    |       |       \---jwt
    |       |               JWTUtil.java
    |       |
    |       \---resources
    |               application.properties
    |
    \---FrontEnd
        |   Dockerfile
        |
        \---workbook
            |   package.json
            |   README.md
            |
            +---public
            |   |   favicon.ico
            |   |   index.html
            |   |
            |   \---img
            |           +.svg
            |           arrowBack.svg
            |           background.svg
            |           basic.png
            |           blueshare.svg
            |           book.svg
            |           check.svg
            |           close.svg
            |           example.svg
            |           fiveStar.svg
            |           fiveStarf.svg
            |           kakao.svg
            |           logo.svg
            |           mango.png
            |           naver.svg
            |           next.svg
            |           notice.svg
            |           person.svg
            |           photo.svg
            |           plus.svg
            |           prev.svg
            |           profile.svg
            |           profileupdate.png
            |           QuestionCheck.svg
            |           QuestionError.svg
            |           search.svg
            |           share.svg
            |           slide1.svg
            |           slide2.svg
            |           slide3.svg
            |           slide4.svg
            |           slide5.svg
            |           star.svg
            |           starCheck.svg
            |           top.svg
            |           topHover.svg
            |           vector.svg
            |           vector_gray.svg
            |           vector_white.svg
            |           whiteshare.svg
            |           workbookdetail.png
            |           x.svg
            |
            \---src
                |   App.js
                |   index.css
                |   index.js
                |   reportWebVitals.js
                |
                +---components
                |   +---add
                |   |       add.js
                |   |       addContent.js
                |   |
                |   +---detail
                |   |       CommentList.js
                |   |       Comments.js
                |   |       DetailPage.js
                |   |       Preview.js
                |   |       Star.js
                |   |
                |   +---header
                |   |       header.js
                |   |       notice.js
                |   |       search.js
                |   |       status.js
                |   |
                |   +---home
                |   |       banner.js
                |   |       carousel.js
                |   |       footer.js
                |   |       home.js
                |   |       post.js
                |   |       slide.js
                |   |
                |   +---join
                |   |       FileUpload.js
                |   |       JoinPage.js
                |   |
                |   +---login
                |   |       LoginPage.js
                |   |
                |   +---mypage
                |   |       create_modal.js
                |   |       delete_modal.js
                |   |       mode_modal.js
                |   |       mypage.js
                |   |       myworkbook.js
                |   |       update_modal.js
                |   |       workbookcontent.js
                |   |
                |   +---notice
                |   |       NoticeEditorPage.js
                |   |       NoticePage.js
                |   |       NoticePost.js
                |   |
                |   +---post
                |   |       allPost.js
                |   |       morePost.js
                |   |       postButton.js
                |   |
                |   +---profile
                |   |       profilePage.js
                |   |       setProfile.js
                |   |
                |   +---sharepage
                |   |       sharepage.js
                |   |       share_content.js
                |   |       share_deletemodal.js
                |   |       share_modemodal.js
                |   |       share_myworkbook.js
                |   |       share_updatemodal.js
                |   |
                |   +---study
                |   |       Answer.js
                |   |       Answers.js
                |   |       ExamPage.js
                |   |       ExamQuestion.js
                |   |       ExamResult.js
                |   |       ExplanationModal.js
                |   |       Progress.js
                |   |       Question.js
                |   |       Result.js
                |   |       StudyPage.js
                |   |       
                |   +---updatepage
                |   |       updatepage.js
                |   |       updatepage_content.js
                |   |
                |   \---updatequestion
                |           updateContent.js
                |           updatequetion.js
                |
                +---constants
                |       index.js
                |
                +---pages
                |       Add.js
                |       Allpost.js
                |       Detail.js
                |       Exam.js
                |       Join.js
                |       Login.js
                |       Main.js
                |       Mypage.js
                |       NotFound.js
                |       Notice.js
                |       NoticeDetail.js
                |       NoticeEditor.js
                |       Profile.js
                |       Sharepage.js
                |       Study.js
                |       Update.js
                |       Updatework.js
                |
                +---style
                |       globals.css
                |       reset.css
                |
                \---utils
                        getLetter.js
                        shuffle.js
```
</details>
<p align="right"><a href="#top">(Top)</a></p>


## <span id="role">4. μ­ν  λΆλ΄</span>
- νλ¨ μ΄λ―Έμ§μ κ°μ΄ κ°μΈ, κ³΅λ μμ νμ΄μ§λ‘ λλμ΄ μ§ννμμ΅λλ€.
- νλ‘μ νΈλ₯Ό μ§ννλ©° API λΉκ΅μ  μ€μνλ€ μκ°λλ λ‘κ·ΈμΈ, νμκ°μ νμ΄μ§λ₯Ό κ³΅ν΅μΌλ‘ μ§ννμμ΅λλ€.

### π  κ³΅ν΅ λ΄λΉ
  - κΈ°ν λ° λμμΈ
### π μ§μ€μ¬ 
  - π[github/jinyun3075](https://github.com/jinyun3075)
  - μλ²
### ππ»ββοΈ μ μμ°¬
  - π[github/sichan1301](https://github.com/sichan1301)
  - λ§μ΄νμ΄μ§ - λμ λ¬Έμ μ§, κ°μ Έμ¨ λ¬Έμ μ§
### ππ»ββοΈ μ΅μ±μ΄
  - π[github/choisung2](https://github.com/choisung2)
  - μ μ²΄ λμμΈ, λ‘κ·ΈμΈ, νμκ°μ, λ¬Έμ , κ³΅μ§μ¬ν­, μμΈ νμ΄μ§
### ππ»β μ νμΈ
  - π[github/Mangopapa1](https://github.com/Mangopapa1)
  - λ©μΈ νμ΄μ§, μ μ²΄ λ¬Έμ μ§, νλ‘ν λ³κ²½ νμ΄μ§

<p align="right"><a href="#top">(Top)</a></p>


## <span id="task">5. κ°λ° κΈ°κ° λ° μμ κ΄λ¦¬</span>
- μ μ²΄ κ°λ° κΈ°κ° : 2022-02-25 ~ 2022-04-01
- κΈ°ν λμμΈ : 2022-02-25 ~ 2022-03-02
- UI κ΅¬ν : 2022-03-03 ~ 2022-03-13
- κΈ°λ₯ κ°λ° : 2022-03-14 ~ 2022-04-01
### μμ κ΄λ¦¬
- π[GitHub Projects](https://github.com/jinyun3075/NePool/projects/1)λ₯Ό μ¬μ©νμ¬ μ§νλμ μν©μ κΎΈμ€ν κ³΅μ νμμ΅λλ€.
<img src="https://user-images.githubusercontent.com/92600646/161484642-ad2f0726-a867-4dd9-b69d-717a9cd49998.png">

### μΌκ°νμ
- π[Notion](https://www.notion.so/NePool-0bbf1e59eb2f414d8a512c606db96e4c)μ νμ©νμ¬ λ§€μΌ μΌμ ν μκ°μ νμλ₯Ό μ§ννμ¬ μμ λ°©ν₯μ΄λ κ°μ’ μ΄μλ€μ λΌμνμμ΅λλ€.
<img width="1074" alt="αα³αα³αα΅α«αα£αΊ 2022-04-09 αα©αα? 4 08 58" src="https://user-images.githubusercontent.com/92600646/162561062-73e62eb9-c13a-4ce4-a715-d97fac4dd72c.png">


<p align="right"><a href="#top">(Top)</a></p>

## <span id="ui">6. UI</span>
![UI](https://user-images.githubusercontent.com/92600646/162561156-5896b69e-5bca-46a6-8cdc-c2e994ad4fda.jpg)


<p align="right"><a href="#top">(Top)</a></p>

## <span id="pages">7. νμ΄μ§ κΈ°λ₯</span>

### 1) ν

|μΊλ¬μ|κ²μ|
|:-:|:-:|
|![αα’αα₯αα¦α―](https://user-images.githubusercontent.com/92600646/162561433-7cde483c-9177-40a3-b26a-ac0100c4fac2.gif)|![αα₯α·αα’α¨-123](https://user-images.githubusercontent.com/92600646/162562024-c353990d-9dfc-4a2b-b859-e798c8d52662.gif)|
|λ‘κ·ΈμΈ|νμκ°μ|
|![αα©αα³αα΅α«](https://user-images.githubusercontent.com/92600646/162564188-5ce868db-a046-4a62-9a2e-580e1d9fec33.gif)|![αα¬αα―α«αα‘αα΅αΈ](https://user-images.githubusercontent.com/92600646/162564183-eb892d85-e75f-46ef-82e7-9339c9528f5f.gif)|
|λ¬Έμ μ§ μΉ΄νκ³ λ¦¬|λ¬Έμ μ§ νμ΄μ§|
|![αα?α«αα²-αα¦αα΅α«](https://user-images.githubusercontent.com/92600646/162562023-c93cded0-ce39-4187-86e6-1b5303c2e85b.gif)|![αα¦αα΅αα΅αΌ](https://user-images.githubusercontent.com/92600646/162564190-deb7807b-0c15-423e-af43-99184702e068.gif)|


### 2) λ§μ΄ νμ΄μ§

|λ¬Έμ μ§ μΆκ°|λ¬Έμ μ§ μμ |
|:-:|:-:|
|![αα?α«αα¦αα΅αΈ αα?αα‘](https://user-images.githubusercontent.com/92600646/162562025-6acf3698-1ea1-4db8-a9d4-a0a2ac11b230.gif)|![αα?α«αα¦αα΅αΈ αα?αα₯αΌ](https://user-images.githubusercontent.com/92600646/162562298-15c2a85e-1955-4f67-9aa9-b70432a9c26d.gif)|
|λ¬Έμ μ§ μ­μ |λ¬Έμ μ§ κ³΅μ |
|![αα?α«αα¦αα΅αΈ αα‘α¨αα¦](https://user-images.githubusercontent.com/92600646/162562301-c79713c9-080b-4a0c-98d2-c7ff06a21dbc.gif)|![αα?α«αα¦αα΅αΈ αα©αΌαα²](https://user-images.githubusercontent.com/92600646/162562302-20fa9ebf-8e56-4eea-87d4-dd0db85e58f2.gif)|
|λ§μ΄νμ΄μ§ - κ³΅λΆλͺ¨λ|λ§μ΄νμ΄μ§ - μνλͺ¨λ|
|![αα‘αα΅αα¦αα΅αα΅-αα©αΌαα?αα©αα³](https://user-images.githubusercontent.com/92600646/162562310-94937381-b8a6-4aaa-be3a-d14bb1fccb64.gif)|![αα‘αα΅αα¦αα΅αα΅ αα΅αα₯α·αα©αα³](https://user-images.githubusercontent.com/92600646/162562740-3f3bf599-d489-47cc-b322-2b014053b6ba.gif)|

### 3) λνμΌ νμ΄μ§
|λνμΌ νμ΄μ§ - κ³΅λΆλͺ¨λ|λνμΌ νμ΄μ§ - μνλͺ¨λ|
|:-:|:-:|
|![αα΅αα¦αα΅α― αα¦αα΅αα΅ αα©αΌαα?αα©αα³](https://user-images.githubusercontent.com/92600646/162562754-75a5afd8-9217-44e3-be3c-f7fb41845198.gif)|![αα΅αα¦αα΅α― αα¦αα΅αα΅ αα΅αα₯α·αα©αα³](https://user-images.githubusercontent.com/92600646/162562756-53be6d89-640b-4f27-a27e-895ad9cbdf9a.gif)|
|λ¦¬λ·°μμ±|λ¦¬λ·°μ­μ |
|![αα΅αα² αα‘α¨αα₯αΌ](https://user-images.githubusercontent.com/92600646/162562313-ac094ace-c79b-479c-92a8-b66e60e7eb1b.gif)|![αα΅αα² αα‘α¨αα¦](https://user-images.githubusercontent.com/92600646/162562312-7064cc4f-2794-4b66-9acb-cc8c2d6f31c7.gif)|
|κ³΅λΆλͺ¨λ|μνλͺ¨λ|
|![αα©αΌαα?αα©αα³](https://user-images.githubusercontent.com/92600646/162562315-3948e746-a85f-42ac-ae87-3d32da3afe37.gif)|![αα΅αα₯α·αα©αα³](https://user-images.githubusercontent.com/92600646/162562316-d3cb80a0-9318-48e8-9c62-15ae26cd4e6d.gif)|
|μμΈνμ΄μ§ μ€ν¬λ©|
|![αα‘αΌαα¦ αα¦αα΅αα΅ αα³αα³αα’αΈ](https://user-images.githubusercontent.com/92600646/162562311-fe43f3c9-7eb5-4276-a385-e6d0811a2c39.gif)|
</br>

<p align="right"><a href="#top">(Top)</a></p>
