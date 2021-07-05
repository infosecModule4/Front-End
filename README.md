# Front-End
>## apache with docker, flask
>> + ### flask
>> Private Server의 Database에 접근해서 값을 가져와서 Json으로 화면에 출력

>> + ### apache
>> Docker의 httpd:latest 이미지를 받아와서 web-mid 폴더와 apache의 웹 리소스가 존재해야하는 폴더를 마운트
>> index.html에 접근하면 Chart.js와 CanvasJS를 이용해서 flask가 출력한 내용을 받아와서 그래프를 그려 이용자의 화면에 출력
