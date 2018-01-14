export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export namespace Thumbnail {
  export interface List {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    [size: string]: Thumbnail;
  }
}

export interface Playlist {
  kind: "youtube#playlist";
  etag: string;
  id: string;
  snippet?: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnail.List;
    channelTitle: string;
    tags: string[];
  };
  status?: {
    privacyStatus?: string;
  };
  contentDetails?: {
    itemCount: number;
  };
  player?: {
    embedHtml: string;
  };
}

export namespace Playlist {
  export namespace List {
    export namespace Request {
      export interface Params {
        key: string;
        part: string;
        id: string;
        maxResults?: number;
        pageToken?: string;
      }
    }
    export interface Response {
      kind: "youtube#playlistListResponse";
      etag: string;
      nextPageToken?: string;
      prevPageToken?: string;
      pageInfo: {
        totalResults: number;
        resultsPerPage: number;
      };
      items: Playlist[];
    }
  }

  export interface Item {
    kind: "youtube#playlistItem";
    etag: string;
    id: string;
    contentDetails?: {
      videoId: string;
      videoPublishedAt: string;
      startAt?: string;
      endAt?: string;
      note?: string;
    };
    snippet?: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: Thumbnail.List;
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: { kind: "youtube#video"; videoId: string };
    };
    status?: { privacyStatus: string };
  }

  export namespace Item {
    export namespace List {
      export namespace Request {
        export interface Params {
          key: string;
          part: string;
          playlistId: string;
          maxResults?: number;
          pageToken?: string;
        }
      }
      export interface Response {
        kind: "youtube#playlistItemListResponse";
        etag: string;
        nextPageToken?: string;
        prevPageToken?: string;
        pageInfo: {
          totalResults: number;
          resultsPerPage: number;
        };
        items: Item[];
      }
    }
  }
}
