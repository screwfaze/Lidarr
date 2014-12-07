﻿using System;
using System.Collections.Generic;
using System.Net;
using NzbDrone.Common.Http;
using NzbDrone.Core.Indexers.Exceptions;
using NzbDrone.Core.Parser.Model;

namespace NzbDrone.Core.Indexers.BroadcastheNet
{
    public class BroadcastheNetParser : IParseIndexerResponse
    {
        public IList<ReleaseInfo> ParseResponse(IndexerResponse indexerResponse)
        {
            var results = new List<ReleaseInfo>();

            switch (indexerResponse.HttpResponse.StatusCode)
            {
                case HttpStatusCode.Unauthorized:
                    throw new ApiKeyException("API Key invalid or not authorized");
                case HttpStatusCode.NotFound:
                    throw new IndexerException(indexerResponse, "Indexer API call returned NotFound, the Indexer API may have changed.");
                case HttpStatusCode.ServiceUnavailable:
                    throw new RequestLimitReachedException("Cannot do more than 150 API requests per hour.");
                default:
                    if (indexerResponse.HttpResponse.StatusCode != HttpStatusCode.OK)
                    {
                        throw new IndexerException(indexerResponse, "Indexer API call returned an unexpected StatusCode [{0}]", indexerResponse.HttpResponse.StatusCode);
                    }
                    break;
            }

            var jsonResponse = new HttpResponse<JsonRpcResponse<BroadcastheNetTorrents>>(indexerResponse.HttpResponse).Resource;

            if (jsonResponse.Error != null || jsonResponse.Result == null)
            {
                throw new IndexerException(indexerResponse, "Indexer API call returned an error [{0}]", jsonResponse.Error);
            }
            
            if (jsonResponse.Result.Results == 0)
            {
                return results;
            }

            foreach (var torrent in jsonResponse.Result.Torrents.Values)
            {
                var torrentInfo = new TorrentInfo();

                torrentInfo.Guid = String.Format("BTN-{0}", torrent.TorrentID);
                torrentInfo.Title = torrent.ReleaseName;
                torrentInfo.Size = torrent.Size;
                torrentInfo.DownloadUrl = torrent.DownloadURL;
                torrentInfo.InfoUrl = String.Format("https://broadcasthe.net/torrents.php?id={0}&torrentid={1}", torrent.GroupID, torrent.TorrentID);
                //torrentInfo.CommentUrl =
                if (torrent.TvrageID.HasValue)
                {
                    torrentInfo.TvRageId = torrent.TvrageID.Value;
                }
                torrentInfo.PublishDate = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).ToUniversalTime().AddSeconds(torrent.Time);
                //torrentInfo.MagnetUrl = 
                torrentInfo.InfoHash = torrent.InfoHash;
                torrentInfo.Seeds = torrent.Seeders;
                torrentInfo.Peers = torrent.Leechers;

                results.Add(torrentInfo);
            }

            return results;
        }
    }
}