import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from "react-avatar";

import capitalize from '../../utils/capitalize';
import getCurrentUser from '../../utils/auth';
import ROUTES from '../../utils/routes';
import ArticleActions from '../../containers/ArticleActions';
import config from '../../config';

const renderTime = readtime => (
  <React.Fragment>
    <span className="p-r--5 p-l--5">.</span>
    {`${readtime} min read`}
  </React.Fragment>
);

const AuthorDetails = ({
  user, date, small, averageRate, readtime, onStarClick, slug,
}) => (
  <div className="row author__panel p-t--20">
    <div className="author col s10 m10">
      <Link to="/">
        <Avatar
          name={user.username}
          size="40"
          textSizeRatio="1.75"
          className={`responsive-img circle ${small ? 'avatar--small' : 'avatar--small'}`}
          src={user.image ? user.image : config.DEFAULT_USER_AVATAR}
        />
      </Link>
      <div className={`author__details ${small && 'author--small'}`}>
        <div className="author__info">
          <div className="author-name">
            <Link to={`${ROUTES.profile}/${user.username}`}>
              {capitalize(user.username)}
            </Link>
          </div>
          {!small
            && !getCurrentUser() && (
              <a className="btn-flat btn-flat--primary" href="#!">
                Follow
              </a>
          )}
        </div>

        <div className="article__highlights">
          {new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
          {small ? renderTime(readtime) : renderTime(readtime)}
        </div>
      </div>
    </div>

    <div className="col s2 m2 right">
      <div className="m-t--15">
        {getCurrentUser()
          && user.username === getCurrentUser().username
          && <ArticleActions slug={slug} />}
      </div>
    </div>
  </div>
);

export default AuthorDetails;

AuthorDetails.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  slug: PropTypes.string,
  readtime: PropTypes.string,
  small: PropTypes.bool,
  date: PropTypes.string.isRequired,
  onStarClick: PropTypes.func,
  averageRate: PropTypes.number,
};