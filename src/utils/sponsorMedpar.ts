// Sponsor
import AyamAyaman from '../resource/sponsor_medpar/sponsor/S/AyamAyaman.png';
import BankNeoCommerce from '../resource/sponsor_medpar/sponsor/S/Bank-Neo-Commerce.png';
import BukitAsam from '../resource/sponsor_medpar/sponsor/S/Bukit-Asam.png';
import Byu from '../resource/sponsor_medpar/sponsor/S/byu.png';
import FrisianFlag from '../resource/sponsor_medpar/sponsor/S/Frisian-Flag.png';
import KuaciRebo from '../resource/sponsor_medpar/sponsor/S/Kuaci-Rebo.png';
import NTP from '../resource/sponsor_medpar/sponsor/S/NTP.jpg';
import StudyBoardEdu from '../resource/sponsor_medpar/sponsor/S/Study-Board.png';
import Whitelab from '../resource/sponsor_medpar/sponsor/S/Whitelab.jpg';
import Zebra from '../resource/sponsor_medpar/sponsor/S/Zebra-Asaba-Industries.png';

import Dorm from '../resource/sponsor_medpar/sponsor/M/Dorm.png';
import IAITB from '../resource/sponsor_medpar/sponsor/M/IA-ITB-(BW).png';
import PTTimah from '../resource/sponsor_medpar/sponsor/M/PT-Timah.png';
import SinggahSini from '../resource/sponsor_medpar/sponsor/M/Singgah-Sini.png';

import HutamaKarya from '../resource/sponsor_medpar/sponsor/L/Hutama-Karya.png';
import MantappuCorp from '../resource/sponsor_medpar/sponsor/L/Mantappu-Corp.png';

// Medpar
import ASResourcesIndonesia from '../resource/sponsor_medpar/Batch-1/S/AS-Resources-Indonesia.png';
import EventBandung from '../resource/sponsor_medpar/Batch-1/S/Event-Bandung.jpg';
import EventBanget from '../resource/sponsor_medpar/Batch-1/S/Event-Banget.png';
import EventCampus from '../resource/sponsor_medpar/Batch-1/S/Event-Campus.png';
import EventHunter from '../resource/sponsor_medpar/Batch-1/S/Event-Hunter-id.png';
import EventKampus from '../resource/sponsor_medpar/Batch-1/S/Event-Kampus.png';
import EventList from '../resource/sponsor_medpar/Batch-1/S/Event-List.png';
import EventMahasiswa8 from '../resource/sponsor_medpar/Batch-1/S/Event-Mahasiswa8.png';
import EventNetwork from '../resource/sponsor_medpar/Batch-1/S/Event-Network.png';
import EventNews from '../resource/sponsor_medpar/Batch-1/S/Event-News.jpg';
import EventTik from '../resource/sponsor_medpar/Batch-1/S/Event-Tik.png';
import InfoBandungTimur from '../resource/sponsor_medpar/Batch-1/S/Info-Bandung-Timur/Info-Bandung-Timur.png';
import InfoMahasiswaIndonesia from '../resource/sponsor_medpar/Batch-1/S/Info-Mahasiswa-Indonesia.png';
import InfoVolunteers from '../resource/sponsor_medpar/Batch-1/S/Info-Volunteers.png';
import InfoWebinarEvent from '../resource/sponsor_medpar/Batch-1/S/InfoWebinarEvent/InfoWebinarEvent2.jpg';
import InformasiEvent from '../resource/sponsor_medpar/Batch-1/S/Informasi-Event.jpg';
import ITBReceh from '../resource/sponsor_medpar/Batch-1/S/ITB-Receh.png';
import ITBStory from '../resource/sponsor_medpar/Batch-1/S/ITB-Story.jpg';
import JatinangorBanget from '../resource/sponsor_medpar/Batch-1/S/Jatinangor-Banget.png';
import KawalEvent from '../resource/sponsor_medpar/Batch-1/S/Kawal-Event.jpg';
import MadingEvent from '../resource/sponsor_medpar/Batch-1/S/Mading-Event/Mading-Event-Gelap.png';
import MediaEvent from '../resource/sponsor_medpar/Batch-1/S/Media-Event.png';
import OlimpiadeUpdate from '../resource/sponsor_medpar/Batch-1/S/Olimpiade-Update.png';
import RadioKampusITB from '../resource/sponsor_medpar/Batch-1/S/Radio-Kampus-ITB.jpg';
import RadioUntar from '../resource/sponsor_medpar/Batch-1/S/RadioUntar.png';
import RapmaFM from '../resource/sponsor_medpar/Batch-1/S/RapmaFM.png';
import SeputarEvent from '../resource/sponsor_medpar/Batch-1/S/Seputar-Event.png';
import SeputarInfo from '../resource/sponsor_medpar/Batch-1/S/Seputar-Info-id.jpg';
import UpdateMahasiswa from '../resource/sponsor_medpar/Batch-1/S/Update-Mahasiswa.jpeg';

import AISEC from '../resource/sponsor_medpar/Batch-1/M/AIESEC-Bandung/AIESEC.jpg';
import BCM from '../resource/sponsor_medpar/Batch-1/M/Bandung-Creative-Media/BCM.png';
import MaraFM from '../resource/sponsor_medpar/Batch-1/M/MaraFM/MaraFM.png';
import MMTCRadio from '../resource/sponsor_medpar/Batch-1/M/MMTC-Radio.png';
import TRadio from '../resource/sponsor_medpar/Batch-1/M/TRadio/TRadio.png';

import LapanEH from '../resource/sponsor_medpar/Batch-1/L/8EH-Radio-ITB/8EH-Red.png';
import BahanaFM from '../resource/sponsor_medpar/Batch-1/L/Bahana-FM.png';
import Boulevard from '../resource/sponsor_medpar/Batch-1/L/Boulevard/Boulevard2.png';
import Hearo from '../resource/sponsor_medpar/Batch-1/L/Hearo/Hearo-Logotype-Black.png';
import LFM from '../resource/sponsor_medpar/Batch-1/L/LFM.jpg';
import MaveMagazine from '../resource/sponsor_medpar/Batch-1/L/Mave-Magazine.png';

import GNFI from '../resource/sponsor_medpar/Batch-1/XL/GNFI/GNFI-Horizontal.png';
import InilahKoran from '../resource/sponsor_medpar/Batch-1/XL/INILAH-KORAN.png';
import JPNN from '../resource/sponsor_medpar/Batch-1/XL/JPNN.png';
import Kompasiana from '../resource/sponsor_medpar/Batch-1/XL/Kompasiana/Kompasiana-Biru.png';
import Republika from '../resource/sponsor_medpar/Batch-1/XL/Republika.jpg';

export interface SponsorMedparData {
  name: string;
  src: string;
  size: string;
}

export const sponsor: SponsorMedparData[] = [
  { name: 'Ayam Ayaman', src: AyamAyaman, size: 'S' },
  { name: 'Bank Neo Commerce', src: BankNeoCommerce, size: 'S' },
  { name: 'Bukit Asam', src: BukitAsam, size: 'S' },
  { name: 'byu', src: Byu, size: 'S' },
  { name: 'Frisian Flag', src: FrisianFlag, size: 'S' },
  { name: 'Kuaci Rebo', src: KuaciRebo, size: 'S' },
  { name: 'NTP', src: NTP, size: 'S' },
  { name: 'Study Board Edu', src: StudyBoardEdu, size: 'S' },
  { name: 'Whitelab', src: Whitelab, size: 'S' },
  { name: 'Zebra Asaba Industries', src: Zebra, size: 'S' },
  { name: 'Dorm', src: Dorm, size: 'M' },
  { name: 'IA ITB', src: IAITB, size: 'M' },
  { name: 'PT Timah', src: PTTimah, size: 'M' },
  { name: 'Singgah Sini', src: SinggahSini, size: 'M' },
  { name: 'Hutama Karya', src: HutamaKarya, size: 'L' },
  { name: 'Mantappu Corp', src: MantappuCorp, size: 'L' },
];
  
export const medpar: SponsorMedparData[] = [
  { name: 'AS Resources Indonesia', src: ASResourcesIndonesia, size: 'S' },
  { name: 'Event Bandung', src: EventBandung, size: 'S' },
  { name: 'Event Banget', src: EventBanget, size: 'S' },
  { name: 'Event Campus', src: EventCampus, size: 'S' },
  { name: 'Event Hunter.id', src: EventHunter, size: 'S' },
  { name: 'Event Kampus', src: EventKampus, size: 'S' },
  { name: 'Event List', src: EventList, size: 'S' },
  { name: 'Event Mahasiswa 8', src: EventMahasiswa8, size: 'S' },
  { name: 'Event Network', src: EventNetwork, size: 'S' },
  { name: 'Event News', src: EventNews, size: 'S' },
  { name: 'Event Tik', src: EventTik, size: 'S' },
  { name: 'Info Bandung Timur', src: InfoBandungTimur, size: 'S' },
  { name: 'Info Mahasiswa Indonesia', src: InfoMahasiswaIndonesia, size: 'S' },
  { name: 'Info Volunteers', src: InfoVolunteers, size: 'S' },
  { name: 'Info Webinar Event', src: InfoWebinarEvent, size: 'S' },
  { name: 'Informasi Event', src: InformasiEvent, size: 'S' },
  { name: 'ITB Receh', src: ITBReceh, size: 'S' },
  { name: 'ITB Story', src: ITBStory, size: 'S' },
  { name: 'Jatinangor Banget', src: JatinangorBanget, size: 'S' },
  { name: 'Kawal Event', src: KawalEvent, size: 'S' },
  { name: 'Mading Event', src: MadingEvent, size: 'S' },
  { name: 'Media Event', src: MediaEvent, size: 'S' },
  { name: 'Olimpiade Update', src: OlimpiadeUpdate, size: 'S' },
  { name: 'Radio Kampus ITB', src: RadioKampusITB, size: 'S' },
  { name: 'Radio Untar', src: RadioUntar, size: 'S' },
  { name: 'RapmaFM', src: RapmaFM, size: 'S' },
  { name: 'Seputar Event', src: SeputarEvent, size: 'S' },
  { name: 'Seputar Info ID', src: SeputarInfo, size: 'S' },
  { name: 'Update Mahasiswa', src: UpdateMahasiswa, size: 'S' },
  { name: 'AISEC Bandung', src: AISEC, size: 'M' },
  { name: 'Bandung Creative Media', src: BCM, size: 'M' },
  { name: 'Mara FM', src: MaraFM, size: 'M' },
  { name: 'MMTC Radio', src: MMTCRadio, size: 'M' },
  { name: 'Telkomsel Radio', src: TRadio, size: 'M' },
  { name: '8EH Radio ITB', src: LapanEH, size: 'L' },
  { name: 'Bahana FM', src: BahanaFM, size: 'L' },
  { name: 'Boulevard', src: Boulevard, size: 'L' },
  { name: 'Hearo', src: Hearo, size: 'L' },
  { name: 'LFM', src: LFM, size: 'L' },
  { name: 'Mave Magazine', src: MaveMagazine, size: 'L' },
  { name: 'GNFI', src: GNFI, size: 'XL' },
  { name: 'Inilah Koran', src: InilahKoran, size: 'XL' },
  { name: 'JPNN', src: JPNN, size: 'XL' },
  { name: 'Kompasiana', src: Kompasiana, size: 'XL' },
  { name: 'Republika', src: Republika, size: 'XL' },
];