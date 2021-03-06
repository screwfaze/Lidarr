import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createArtistSelector from 'Store/Selectors/createArtistSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import EpisodeSearchCell from './EpisodeSearchCell';

function createMapStateToProps() {
  return createSelector(
    (state, { albumId }) => albumId,
    (state, { sceneSeasonNumber }) => sceneSeasonNumber,
    createArtistSelector(),
    createCommandsSelector(),
    (albumId, sceneSeasonNumber, artist, commands) => {
      const isSearching = _.some(commands, (command) => {
        const episodeSearch = command.name === commandNames.ALBUM_SEARCH;

        if (!episodeSearch) {
          return false;
        }

        return command.body.albumIds.indexOf(albumId) > -1;
      });

      return {
        artistMonitored: artist.monitored,
        artistType: artist.artistType,
        isSearching
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onSearchPress(name, path) {
      dispatch(executeCommand({
        name: commandNames.ALBUM_SEARCH,
        albumIds: [props.albumId]
      }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(EpisodeSearchCell);
