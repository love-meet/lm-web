
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { backendUrl } from '../api/axios';
import { useAuth } from './AuthContext';


export const PostContext = createContext();

export const usePost = () => {
    return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [commentLoading, setCommentLoading] = useState(false);
    const { user } = useAuth()

    const socket = io(backendUrl());

    useEffect(() => {
        if (!user) return;
        socket.on('connect', () => {
            console.log('connected to feeds socket');
            fetchPosts(1);
        });

        socket.on('feeds', (data) => {
            setPosts(prevPosts => [...prevPosts, ...data.feeds]);
            setPagination(data.pagination);
            setLoading(false);
        });

        socket.on('newPost', (post) => {
            setPosts(prevPosts => [post, ...prevPosts]);
        });

        socket.on('postUpdated', (updatedPost) => {
            setPosts(prevPosts => prevPosts.map(post => post.postId === updatedPost.postId ? updatedPost : post));
        });

        socket.on('postDeleted', ({ postId }) => {
            setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
        });

        socket.on('commentAdded', ({ postId, comment }) => {
            if (comment) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: [...(post.comments || []), comment] }
                        : post
                ));
            }
        });

        socket.on('replyAdded', ({ postId, commentId, reply }) => {
            if (reply) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: post.comments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, replies: [...(comment.replies || []), reply] }
                                : comment
                        ) }
                        : post
                ));
            }
        });

        socket.on('error', (error) => {
            setError(error.message);
            console.error('Socket Error:', error);
        });


        return () => {
            socket.disconnect();
        };
    }, [user]);

    const fetchPosts = (page, callback) => {
        setLoading(true);
        socket.emit('fetchFeeds', { page }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setPosts(prevPosts => [...prevPosts, ...response.feeds]);
                setPagination(response.pagination);
            }
            setLoading(false);
            if (callback) callback(response);
        });
    };

    const createPost = (postData, callback) => {
        if (!user) return;
        socket.emit('createPost', { ...postData, userId: user.userId }, (response) => {
            if (response.error) {
                setError(response.error);
            }
            if (callback) callback(response);
        });
    };

    const toggleLike = (postId, callback) => {
        if (!user) return;
        socket.emit('toggleLike', { postId, userId: user.userId }, (response) => {
            if (response.error) {
                setError(response.error);
            } else if (response.updatedPost) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === response.updatedPost.postId ? response.updatedPost : post
                ));
            }
            if (callback) callback(response);
        });
    };

    const addComment = (postId, content, callback) => {
        if (!user) return;
        setCommentLoading(true);
        socket.emit('addComment', { postId, content, username: user.username, userAvatar: user.picture }, (response) => {
            if (response.error) {
                setError(response.error);
            } else if (response.comment) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: [...(post.comments || []), response.comment] }
                        : post
                ));
            }
            setCommentLoading(false);
            if (callback) callback(response);
        });
    };

    const replyComment = (postId, commentId, content, callback) => {
        if (!user) return;
        setCommentLoading(true);
        socket.emit('replyComment', { postId, commentId, content, username: user.username, userAvatar: user.picture }, (response) => {
            if (response.error) {
                setError(response.error);
            } else if (response.reply) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: post.comments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, replies: [...(comment.replies || []), response.reply] }
                                : comment
                        ) }
                        : post
                ));
            }
            setCommentLoading(false);
            if (callback) callback(response);
        });
    };

    const likeComment = (postId, commentId, callback) => {
        if (!user) return;
        socket.emit('likeComment', { postId, commentId }, (response) => {
            if (response.error) {
                setError(response.error);
            }
            if (callback) callback(response);
        });
    };

    const getPostComments = (postId) => {
        const post = posts.find(p => p.postId === postId);
        return post ? post.comments : [];
    };

    const value = {
        posts,
        loading,
        error,
        pagination,
        commentLoading,
        fetchPosts,
        createPost,
        toggleLike,
        addComment,
        replyComment,
        likeComment,
        getPostComments,
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};
