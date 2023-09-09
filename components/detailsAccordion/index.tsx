import React, {JSX} from 'react';
//@ts-ignore
import {AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {CommentsBox} from '../commentsBox';
import {AuthorCard} from '../authorCard';
import {PostDetails} from '../../types';
import {View} from 'react-native';
import {Title} from '../fragments/Title';
import {COLORS} from '../../styles/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.text,
    borderWidth: 1,
    paddingVertical: 12,
  },
  headerIcon: {
    marginRight: 20,
    padding: 8,
    backgroundColor: COLORS.yellow,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
  },
  bodyContainer: {paddingVertical: 12, backgroundColor: COLORS.gray},
});

const Header = React.memo(({title}: {title: string}) => {
  return (
    <View style={styles.headerContainer}>
      <Icon
        name={title === 'Author information' ? 'user' : 'message'}
        size={20}
        style={styles.headerIcon}
      />
      <Title style={styles.headerTitle}>{title}</Title>
    </View>
  );
});

const Body = React.memo(({body}: {body: JSX.Element}) => (
  <View style={styles.bodyContainer}>{body}</View>
));

const DetailsAccordion = React.memo(({author, comments}: PostDetails) => (
  <AccordionList
    list={[
      {
        id: 1,
        title: 'Author information',
        body: <AuthorCard {...author} />,
      },
      {
        id: 2,
        title: 'Comments',
        body: <CommentsBox comments={comments} />,
      },
    ]}
    header={({title}: {title: string}) => <Header title={title} />}
    body={({body}: {body: JSX.Element}) => <Body body={body} />}
  />
));

export {DetailsAccordion};
