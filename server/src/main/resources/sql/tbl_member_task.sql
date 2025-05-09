-- 개인용 도전 과제 pool 테이블
create table tbl_member_task(
       id 		                    bigint auto_increment primary key,
       member_id                    bigint not null,
       task_pool_id                 bigint not null,
       member_task_status		    varchar(50) default '정상',
       created_date                 datetime, -- 기본값: 내일 날짜
       updated_date                 datetime,
       constraint fk_member_task_member foreign key (member_id)
           references tbl_member (id),
       constraint fk_member_task_member_task_pool foreign key (task_pool_id)
           references tbl_member_task_pool (id)
);

-- 1. 먼저 컬럼을 추가합니다.
ALTER TABLE tbl_member_task
    ADD COLUMN member_id BIGINT NOT NULL;

-- 2. 그다음 외래키 제약조건을 추가합니다.
ALTER TABLE tbl_member_task
    ADD CONSTRAINT fk_member_task_member
        FOREIGN KEY (member_id)
            REFERENCES tbl_member(id);