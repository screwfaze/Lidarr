import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import EpisodeDetailsModal from './EpisodeDetailsModal';
import styles from './EpisodeSearchCell.css';

class EpisodeSearchCell extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onManualSearchPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      albumId,
      artistId,
      episodeTitle,
      isSearching,
      onSearchPress,
      ...otherProps
    } = this.props;

    return (
      <TableRowCell className={styles.episodeSearchCell}>
        <SpinnerIconButton
          name={icons.SEARCH}
          isSpinning={isSearching}
          onPress={onSearchPress}
        />

        <IconButton
          name={icons.INTERACTIVE}
          onPress={this.onManualSearchPress}
        />

        <EpisodeDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          albumId={albumId}
          artistId={artistId}
          episodeTitle={episodeTitle}
          selectedTab="search"
          startInteractiveSearch={true}
          onModalClose={this.onDetailsModalClose}
          {...otherProps}
        />
      </TableRowCell>
    );
  }
}

EpisodeSearchCell.propTypes = {
  albumId: PropTypes.number.isRequired,
  artistId: PropTypes.number.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

export default EpisodeSearchCell;
