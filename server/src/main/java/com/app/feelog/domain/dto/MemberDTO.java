package com.app.feelog.domain.dto;

import com.app.feelog.domain.enumeration.*;
import com.app.feelog.domain.vo.MemberVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MemberDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String memberEmail;
    private String memberPassword;
    private String memberNickname;
    private String memberIntroduce;
    private String memberFilePath;
    private String memberFileName;
    private MemberType memberType;
    private MemberNotificationPostReply memberNotificationPostReply;
    private MemberNotificationPostReplyLike memberNotificationPostReplyLike;
    private MemberNotificationPostLike       memberNotificationPostLike;
    private MemberNotificationSubscribe memberNotificationSubscribe;
    private MemberNotificationCommunityPost  memberNotificationCommunityPost;
    private MemberNotificationMessage        memberNotificationMessage;
    private MemberStatus memberStatus;
    private String createdDate;
    private String updatedDate;

    public MemberDTO() {
        this.memberNotificationPostReply = MemberNotificationPostReply.OFF;
        this.memberNotificationPostReplyLike = memberNotificationPostReplyLike.OFF;
        this.memberNotificationPostLike = memberNotificationPostLike.OFF;
        this.memberNotificationSubscribe = memberNotificationSubscribe.OFF;
        this.memberNotificationCommunityPost = memberNotificationCommunityPost.OFF;
        this.memberNotificationMessage = memberNotificationMessage.OFF;
    }

    public MemberVO toVO() {
        return MemberVO.builder()
                .id(id)
                .memberEmail(memberEmail)
                .memberPassword(memberPassword)
                .memberNickname(memberNickname)
                .memberIntroduce(memberIntroduce)
                .memberFilePath(memberFilePath)
                .memberFileName(memberFileName)
                .memberType(memberType)
                .memberNotificationPostReply(memberNotificationPostReply)
                .memberNotificationPostReplyLike(memberNotificationPostReplyLike)
                .memberNotificationPostLike(memberNotificationPostLike)
                .memberNotificationSubscribe(memberNotificationSubscribe)
                .memberNotificationCommunityPost(memberNotificationCommunityPost)
                .memberNotificationMessage(memberNotificationMessage)
                .memberStatus(memberStatus)
                .createdDate(createdDate)
                .updatedDate(updatedDate)
                .build();
    }
}