﻿using System.Collections.Generic;
using System.Linq;
using NzbDrone.Core.Profiles.Qualities;
using Lidarr.Http.REST;

namespace Lidarr.Api.V1.Profiles.Quality
{
    public class QualityProfileResource : RestResource
    {
        public string Name { get; set; }
        public NzbDrone.Core.Qualities.Quality Cutoff { get; set; }
        public List<QualityProfileQualityItemResource> Items { get; set; }
    }

    public class QualityProfileQualityItemResource : RestResource
    {
        public NzbDrone.Core.Qualities.Quality Quality { get; set; }
        public bool Allowed { get; set; }
    }

    public static class ProfileResourceMapper
    {
        public static QualityProfileResource ToResource(this Profile model)
        {
            if (model == null) return null;

            return new QualityProfileResource
            {
                Id = model.Id,

                Name = model.Name,
                Cutoff = model.Cutoff,
                Items = model.Items.ConvertAll(ToResource),
            };
        }

        public static QualityProfileQualityItemResource ToResource(this ProfileQualityItem model)
        {
            if (model == null) return null;

            return new QualityProfileQualityItemResource
            {
                Quality = model.Quality,
                Allowed = model.Allowed
            };
        }

        public static Profile ToModel(this QualityProfileResource resource)
        {
            if (resource == null) return null;

            return new Profile
            {
                Id = resource.Id,

                Name = resource.Name,
                Cutoff = (NzbDrone.Core.Qualities.Quality)resource.Cutoff.Id,
                Items = resource.Items.ConvertAll(ToModel)
            };
        }

        public static ProfileQualityItem ToModel(this QualityProfileQualityItemResource resource)
        {
            if (resource == null) return null;

            return new ProfileQualityItem
            {
                Quality = (NzbDrone.Core.Qualities.Quality)resource.Quality.Id,
                Allowed = resource.Allowed
            };
        }

        public static List<QualityProfileResource> ToResource(this IEnumerable<Profile> models)
        {
            return models.Select(ToResource).ToList();
        }
    }
}