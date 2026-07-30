import type { GameId } from "@/libs/database/gamesData";
import type { CollaboratorId } from "@/libs/database/teamData";

export type MediaCategory =
  "screenshot" | "concept-art" | "gameplay" | "characters" | "environment";
export type MediaType = "image" | "video" | "gif";

export interface MediaItem {
  id: string;
  url: string;
  title: string;
  caption?: string;
  type: MediaType;
  category: MediaCategory;
  poster?: string;
  gameId?: GameId;
  collaboratorId?: CollaboratorId;
  fit?: "cover" | "contain";
  bgColor?: string;
}

export const mediaData: MediaItem[] = [
  // TONKORI

  {
    id: "tonkori-dagger",
    url: "/tonkori/Tonkori_Dagger3DModdel.png",
    title: "Weapon | Dagger",
    type: "image",
    category: "screenshot",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
  },
  {
    id: "tonkori-house-gif",
    url: "/tonkori/Tonkori_HouseGif.gif",
    title: "House",
    type: "gif",
    category: "environment",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
    fit: "contain",
  },
  {
    id: "tonkori-sword",
    url: "/tonkori/Tonkori_Sword3DModdel.png",
    title: "Weapon | Sword",
    type: "image",
    category: "screenshot",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
  },
  {
    id: "tonkori-stone",
    url: "/tonkori/Tonkori_Stone.png",
    title: "Kalivek Stone",
    type: "image",
    category: "screenshot",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
    fit: "contain",
    bgColor: "#686868",
  },
  {
    id: "tonkori-house-2",
    url: "/tonkori/Tonkori_House2.png",
    title: "House",
    type: "image",
    category: "environment",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
    fit: "contain",
    bgColor: "#3F3F3F",
  },
  {
    id: "tonkori-house-3",
    url: "/tonkori/Tonkori_House3.png",
    title: "House",
    type: "image",
    category: "screenshot",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
    fit: "contain",
    bgColor: "black",
  },

  // AFTERLIGHT

  {
    id: "afterlight-states",
    url: "/afterlight/States.png",
    title: "Estados",
    type: "image",
    category: "screenshot",
    gameId: "afterlight",
    collaboratorId: "angelramirez",
  },
  {
    id: "concept-art-enemies",
    url: "/afterlight/Concept Art.png",
    title: "Enemies Concept Art",
    type: "image",
    category: "characters",
    gameId: "afterlight",
    fit: "contain",
    bgColor: "#B0B0B0",
  },
  {
    id: "concept-art-enemies2",
    url: "/afterlight/Concept Art.jpg",
    title: "Enemies Concept Art",
    type: "image",
    category: "characters",
    gameId: "afterlight",
    collaboratorId: "gabi",
  },

  // THE OBSERVER
  {
    id: "character-info-concept",
    url: "/theobserver/CharacterInfo_Concept.png",
    title: "Character Info Concept",
    type: "image",
    category: "concept-art",
    gameId: "theobserver",
  },
  {
    id: "first-concept-art",
    url: "/theobserver/FirstConceptArt.png",
    title: "First Concept Art",
    type: "image",
    category: "characters",
    gameId: "theobserver",
    collaboratorId: "javigarni",
  },
  {
    id: "ivy-concept-art",
    url: "/theobserver/Ivy_ConceptArt.png",
    title: "Ivy-Concept Art",
    type: "image",
    category: "characters",
    gameId: "theobserver",
    collaboratorId: "javigarni",
  },
  {
    id: "luna-concept-art",
    url: "/theobserver/Luna_ConceptArt.png",
    title: "Luna Concept Art",
    type: "image",
    category: "characters",
    gameId: "theobserver",
    collaboratorId: "javigarni",
  },
  {
    id: "profile-concept",
    url: "/theobserver/Profile_Concept.png",
    title: "Profile Concept",
    type: "image",
    category: "concept-art",
    gameId: "theobserver",
  },

  // TINY CARE
  {
    id: "example-figma",
    url: "/tinycare/Example.png",
    title: "Example",
    type: "image",
    category: "environment",
    gameId: "tinycare",
    fit: "contain",
  },
  {
    id: "bunny",
    url: "/tinycare/Bunny.png",
    title: "Bunny",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "cat",
    url: "/tinycare/Cat.png",
    title: "Cat",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "duck",
    url: "/tinycare/Duck.png",
    title: "Duck",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "gigaduck",
    url: "/tinycare/GigaDuck.png",
    title: "GigaDuck",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "potato",
    url: "/tinycare/Potato.png",
    title: "Potato",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "rock",
    url: "/tinycare/Rock.png",
    title: "Rock",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "dog",
    url: "/tinycare/Dog.png",
    title: "Dog",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "turtle",
    url: "/tinycare/Turtle.png",
    title: "Turtle",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "turtle",
    url: "/tinycare/Turtle_1.png",
    title: "Turtle",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "crab",
    url: "/tinycare/Crab.png",
    title: "Orange Crab",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "dog_2",
    url: "/tinycare/Dog_2.png",
    title: "Dogiana",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
  {
    id: "pidgeon",
    url: "/tinycare/Pidgeon.png",
    title: "Esteban",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
    fit: "contain",
    bgColor: "white",
  },
];

export function getGameGallery(gameId: GameId) {
  return mediaData.filter((m) => m.gameId === gameId);
}

export function getCollaboratorMedia(collaboratorId: CollaboratorId) {
  return mediaData.filter((m) => m.collaboratorId === collaboratorId);
}
