import React from 'react';
import Avatar from 'components/Avatar';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const MainContainer = styled('div')({
    width: '97%',
    display: 'flex',
    marginTop: '10px'
});

const AvatarContainer = styled('div')({
    width: '70px'
});

const MessageContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

const MessageContent = styled('div')({
    color: '#DCDDDE',
    wordBreak: 'break-all'
});

const SameAuthorMessageText = styled('span')({
    marginLeft: '70px'
});

const SameAuthorMessageContent = styled('div')({
    color: '#DCDDDE',
    width: '97%',
    wordBreak: 'break-all'
});

const Message = ({ content, sameAuthor, name, date, sameDay}) => {
  
    if(sameAuthor && sameDay) {
        return (
            <SameAuthorMessageContent>
                <SameAuthorMessageText>{content}</SameAuthorMessageText>
            </SameAuthorMessageContent>
        )
    }
    

  return (
    <MainContainer>
        <AvatarContainer>
            <Avatar name={name} />
        </AvatarContainer>
        <MessageContainer>
            <Typography style={{fontSize: '16px', color: 'white'}}>
                {name}{' '}
                <span style={{fontSize: '12px', color: '#72767d'}}>
                    {date}
                </span>
            </Typography>
            <MessageContent>
                {content}
            </MessageContent>
        </MessageContainer>
    </MainContainer>
  )
}

export default Message