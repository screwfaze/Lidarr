import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { deleteTrackFile } from 'Store/Actions/trackFileActions';
import createEpisodeSelector from 'Store/Selectors/createEpisodeSelector';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import createArtistSelector from 'Store/Selectors/createArtistSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import EpisodeSummary from './EpisodeSummary';

function createMapStateToProps() {
  return createSelector(
    (state) => state.tracks,
    createEpisodeSelector(),
    createCommandsSelector(),
    createDimensionsSelector(),
    (tracks, episode, commands, dimensions) => {
      const items = _.filter(tracks.items, { albumId: episode.id });

      return {
        network: episode.label,
        qualityProfileId: episode.profileId,
        releaseDate: episode.releaseDate,
        overview: episode.overview,
        items,
        columns: tracks.columns
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onDeleteTrackFile() {
      dispatch(deleteTrackFile({
        id: props.trackFileId,
        episodeEntity: props.episodeEntity
      }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(EpisodeSummary);
