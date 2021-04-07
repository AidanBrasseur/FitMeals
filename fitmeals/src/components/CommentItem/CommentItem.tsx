import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Avatar, Comment, Popconfirm, Tooltip } from 'antd';
import axios from 'axios';
import React, { createElement, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { HOST } from '../../config';
import { useSessionContext } from "../../contexts/SessionContext";
import { Comment as CommentType } from '../../types';

type CommentProps = {
    comment: CommentType
}
function CommentItem({ comment }: CommentProps) {
    const [isLiked, setIsLiked] = useState<boolean>(comment.isLiked ? comment.isLiked : false)
    const [sessionContext, updateSessionContext] = useSessionContext();
    const currentHistory = useHistory();
    const onLike = (comment: CommentType) => {
        axios.post(HOST + 'comments/' + comment.id + "/like", {
            data: {
                like: true
            }
        }, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            setIsLiked(true)
        }).catch((error) => {
            console.log(error)
        })
    }
    const goToProfile = (username: string | undefined ) => {
        currentHistory.push(`/profile/${username}`, {hardcode: true});
    }
    const onDislike = (comment: CommentType) => {
        axios.post(HOST + 'comments/' + comment.id + "/like", {
            data: {
                like: false
            }
        }, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            setIsLiked(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const actions = (comment : CommentType) => { 
       
        return ([ 
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={() => { 
                if (!("user" in sessionContext)){
                    currentHistory.push('/login');
                    return;
                } 
                if(!isLiked){
                onLike(comment)
                }
                else{
                    onDislike(comment)
                }
            }}>
                {createElement(isLiked ? LikeFilled : LikeOutlined)}
            </span>
        </Tooltip>
    ]);}

    

    return (
       
        <Comment
        actions={actions(comment)}
        author={comment.username}
        content={comment.content}
        avatar={
            <img onClick={() => goToProfile(comment.username)} src={comment.avatar}/>
        }/>
       
    )
}
export default CommentItem;