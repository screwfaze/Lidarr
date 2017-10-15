import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Truncate from 'react-truncate';
import { icons } from 'Helpers/Props';
import dimensions from 'Styles/Variables/dimensions';
import fonts from 'Styles/Variables/fonts';
import IconButton from 'Components/Link/IconButton';
import Link from 'Components/Link/Link';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import ArtistPoster from 'Artist/ArtistPoster';
import EditArtistModalConnector from 'Artist/Edit/EditArtistModalConnector';
import DeleteArtistModal from 'Artist/Delete/DeleteArtistModal';
import ArtistIndexProgressBar from 'Artist/Index/ProgressBar/ArtistIndexProgressBar';
import ArtistIndexOverviewInfo from './ArtistIndexOverviewInfo';
import styles from './ArtistIndexOverview.css';

const columnPadding = parseInt(dimensions.artistIndexColumnPadding);
const columnPaddingSmallScreen = parseInt(dimensions.artistIndexColumnPaddingSmallScreen);
const defaultFontSize = parseInt(fonts.defaultFontSize);
const lineHeight = parseFloat(fonts.lineHeight);

function calculateHeight(rowHeight, isSmallScreen) {
  let height = rowHeight - 45;

  if (isSmallScreen) {
    height -= columnPaddingSmallScreen;
  } else {
    height -= columnPadding;
  }

  return height;
}

class ArtistIndexOverview extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditArtistModalOpen: false,
      isDeleteArtistModalOpen: false
    };
  }

  //
  // Listeners

  onEditArtistPress = () => {
    this.setState({ isEditArtistModalOpen: true });
  }

  onEditArtistModalClose = () => {
    this.setState({ isEditArtistModalOpen: false });
  }

  onDeleteArtistPress = () => {
    this.setState({
      isEditArtistModalOpen: false,
      isDeleteArtistModalOpen: true
    });
  }

  onDeleteArtistModalClose = () => {
    this.setState({ isDeleteArtistModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      style,
      id,
      artistName,
      overview,
      monitored,
      status,
      nameSlug,
      nextAiring,
      trackCount,
      trackFileCount,
      images,
      posterWidth,
      posterHeight,
      qualityProfile,
      overviewOptions,
      showRelativeDates,
      shortDateFormat,
      timeFormat,
      rowHeight,
      isSmallScreen,
      isRefreshingArtist,
      onRefreshArtistPress,
      ...otherProps
    } = this.props;

    const {
      isEditArtistModalOpen,
      isDeleteArtistModalOpen
    } = this.state;

    const link = `/artist/${nameSlug}`;

    const elementStyle = {
      width: `${posterWidth}px`,
      height: `${posterHeight}px`
    };

    const height = calculateHeight(rowHeight, isSmallScreen);

    return (
      <div className={styles.container} style={style}>
        <div className={styles.poster} style={elementStyle}>
          <div className={styles.posterContainer}>
            {
              status === 'ended' &&
              <div
                className={styles.ended}
                title="Ended"
              />
            }

            <Link
              className={styles.link}
              style={elementStyle}
              to={link}
            >
              <ArtistPoster
                className={styles.poster}
                style={elementStyle}
                images={images}
                size={250}
                lazy={false}
                overflow={true}
              />
            </Link>
          </div>

          <ArtistIndexProgressBar
            monitored={monitored}
            status={status}
            trackCount={trackCount}
            trackFileCount={trackFileCount}
            posterWidth={posterWidth}
            detailedProgressBar={overviewOptions.detailedProgressBar}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.titleRow}>
            <Link
              className={styles.title}
              to={link}
            >
              {artistName}
            </Link>

            <div className={styles.actions}>
              <SpinnerIconButton
                name={icons.REFRESH}
                title="Refresh artist"
                isSpinning={isRefreshingArtist}
                onPress={onRefreshArtistPress}
              />

              <IconButton
                name={icons.EDIT}
                title="Edit Artist"
                onPress={this.onEditArtistPress}
              />
            </div>
          </div>

          <div className={styles.details}>
            <Link
              className={styles.overview}
              style={{
                maxHeight: `${height}px`
              }}
              to={link}
            >
              <Truncate lines={Math.floor(height / (defaultFontSize * lineHeight))}>
                {overview}
              </Truncate>
            </Link>

            <ArtistIndexOverviewInfo
              height={height}
              nextAiring={nextAiring}
              qualityProfile={qualityProfile}
              showRelativeDates={showRelativeDates}
              shortDateFormat={shortDateFormat}
              timeFormat={timeFormat}
              {...overviewOptions}
              {...otherProps}
            />
          </div>
        </div>

        <EditArtistModalConnector
          isOpen={isEditArtistModalOpen}
          artistId={id}
          onModalClose={this.onEditArtistModalClose}
          onDeleteArtistPress={this.onDeleteArtistPress}
        />

        <DeleteArtistModal
          isOpen={isDeleteArtistModalOpen}
          artistId={id}
          onModalClose={this.onDeleteArtistModalClose}
        />
      </div>
    );
  }
}

ArtistIndexOverview.propTypes = {
  style: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  nameSlug: PropTypes.string.isRequired,
  nextAiring: PropTypes.string,
  trackCount: PropTypes.number,
  trackFileCount: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  posterWidth: PropTypes.number.isRequired,
  posterHeight: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  overviewOptions: PropTypes.object.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  isRefreshingArtist: PropTypes.bool.isRequired,
  onRefreshArtistPress: PropTypes.func.isRequired
};

ArtistIndexOverview.defaultProps = {
  trackCount: 0,
  trackFileCount: 0
};

export default ArtistIndexOverview;
