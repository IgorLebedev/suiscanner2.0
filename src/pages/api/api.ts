import { suiNetworkProvider } from "../../providers/SuiNetworkProvider";

const fixIpfs = (imgs: Array<string | null | undefined>): Array<string | null | undefined> => imgs.map((img) => {
  if (img?.startsWith('ipfs')) {
    const link = img?.split('//').slice(-1);
    return `https://ipfs.io/ipfs/${link}`;
  }
  return img;
});

const parsePic = (objectId: string | undefined) => {
  if (objectId !== undefined) {
    const pic = suiNetworkProvider.getObject({
      id: objectId,
      options: {
        showContent: true,
        showDisplay: true,
      }
    });
    return pic;
  }
  return; 
};

const fetchSuiObjs = async (wallet: string) => {
  const allObjects =  await suiNetworkProvider.getOwnedObjects({
    owner: wallet,
  });
  const picturesPromise =  allObjects.data.map(({ data } : any) => parsePic(data?.objectId));
  const picturesRes = await Promise.all(picturesPromise);
  const onlyPics = picturesRes
    .filter((object: any) => {
    const allData = object?.data;
    return allData?.display?.data !== null && allData?.display?.data?.hasOwnProperty('image_url');
  })
    .map((object: any) => {
    const nftData = object?.data?.display;
    if (typeof nftData?.data === 'string' || typeof nftData?.data !== 'object' ) {
      return null;
    }
    return nftData?.data?.image_url;
  });
  const fixed = fixIpfs(onlyPics);
  return fixed;
};

export default fetchSuiObjs