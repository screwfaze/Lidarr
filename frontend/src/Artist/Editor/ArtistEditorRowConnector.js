import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createLanguageProfileSelector from 'Store/Selectors/createLanguageProfileSelector';
import createQualityProfileSelector from 'Store/Selectors/createQualityProfileSelector';
import ArtistEditorRow from './ArtistEditorRow';

function createMapStateToProps() {
  return createSelector(
    createLanguageProfileSelector(),
    createQualityProfileSelector(),
    (languageProfile, qualityProfile) => {
      return {
        languageProfile,
        qualityProfile
      };
    }
  );
}

function ArtistEditorRowConnector(props) {
  return (
    <ArtistEditorRow
      {...props}
    />
  );
}

ArtistEditorRowConnector.propTypes = {
  qualityProfileId: PropTypes.number.isRequired
};

export default connect(createMapStateToProps)(ArtistEditorRowConnector);
