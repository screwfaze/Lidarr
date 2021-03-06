using System.Linq;
using System.Reflection;
using NzbDrone.Core.Configuration;
using Lidarr.Http;
using NzbDrone.Core.Validation;

namespace Lidarr.Api.V1.Config
{
    public class MetadataProviderConfigModule : LidarrConfigModule<MetadataProviderConfigResource>
    {
        public MetadataProviderConfigModule(IConfigService configService)
            : base(configService)
        {
            SharedValidator.RuleFor(c => c.MetadataSource).IsValidUrl();
        }

        protected override MetadataProviderConfigResource ToResource(IConfigService model)
        {
            return MetadataProviderConfigResourceMapper.ToResource(model);
        }
    }
}
