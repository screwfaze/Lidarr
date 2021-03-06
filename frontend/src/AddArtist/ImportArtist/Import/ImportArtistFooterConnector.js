import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ImportArtistFooter from './ImportArtistFooter';

function isMixed(items, selectedIds, defaultValue, key) {
  return _.some(items, (artist) => {
    return selectedIds.indexOf(artist.id) > -1 && artist[key] !== defaultValue;
  });
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.addArtist,
    (state) => state.importArtist,
    (state, { selectedIds }) => selectedIds,
    (addArtist, importArtist, selectedIds) => {
      const {
        monitor: defaultMonitor,
        qualityProfileId: defaultQualityProfileId,
        languageProfileId: defaultLanguageProfileId,
        albumFolder: defaultAlbumFolder,
        primaryAlbumTypes: defaultPrimaryAlbumTypes,
        secondaryAlbumTypes: defaultSecondaryAlbumTypes
      } = addArtist.defaults;

      const items = importArtist.items;

      const isLookingUpArtist = _.some(importArtist.items, (artist) => {
        return !artist.isPopulated && artist.error == null;
      });

      const isMonitorMixed = isMixed(items, selectedIds, defaultMonitor, 'monitor');
      const isQualityProfileIdMixed = isMixed(items, selectedIds, defaultQualityProfileId, 'qualityProfileId');
      const isLanguageProfileIdMixed = isMixed(items, selectedIds, defaultLanguageProfileId, 'languageProfileId');
      const isAlbumFolderMixed = isMixed(items, selectedIds, defaultAlbumFolder, 'albumFolder');
      const isPrimaryAlbumTypesMixed = isMixed(items, selectedIds, defaultPrimaryAlbumTypes, 'primaryAlbumTypes');
      const isSecondaryAlbumTypesMixed = isMixed(items, selectedIds, defaultSecondaryAlbumTypes, 'secondaryAlbumTypes');

      return {
        selectedCount: selectedIds.length,
        isImporting: importArtist.isImporting,
        isLookingUpArtist,
        defaultMonitor,
        defaultQualityProfileId,
        defaultLanguageProfileId,
        defaultAlbumFolder,
        defaultPrimaryAlbumTypes,
        defaultSecondaryAlbumTypes,
        isMonitorMixed,
        isQualityProfileIdMixed,
        isLanguageProfileIdMixed,
        isAlbumFolderMixed,
        isPrimaryAlbumTypesMixed,
        isSecondaryAlbumTypesMixed
      };
    }
  );
}

export default connect(createMapStateToProps)(ImportArtistFooter);
