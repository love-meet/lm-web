import React from 'react';
import ContentLoader from 'react-content-loader';

const PostCardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={320}
    height={420}
    viewBox="0 0 320 420"
    backgroundColor="#222b3a"
    foregroundColor="#3a4252"
    {...props}
  >
    <circle cx="32" cy="32" r="20" /> 
    <rect x="60" y="20" rx="6" ry="6" width="100" height="16" /> 
    <rect x="60" y="40" rx="6" ry="6" width="60" height="12" /> 
    <rect x="16" y="60" rx="12" ry="12" width="288" height="180" /> 
    <rect x="16" y="250" rx="6" ry="6" width="288" height="16" /> 
    <rect x="16" y="270" rx="6" ry="6" width="200" height="12" /> 
    <rect x="16" y="290" rx="6" ry="6" width="80" height="10" /> 
    <rect x="16" y="320" rx="20" ry="20" width="80" height="32" /> 
    <rect x="116" y="320" rx="20" ry="20" width="80" height="32" /> 
    <rect x="216" y="320" rx="20" ry="20" width="80" height="32" /> 
  </ContentLoader>
);

export default PostCardLoader;