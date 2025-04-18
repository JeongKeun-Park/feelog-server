package com.app.feelog.domain.enumeration;

public enum MemberNotificationCommunityPost {
    SET("설정"),
    CLEAR("해제");

    private String code;

    private MemberNotificationCommunityPost(String code){
        this.code = code;
    }

    public String getCode(){
        return code;
    }
}
