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
  },
  {
    id: "tonkori-house-2",
    url: "/tonkori/Tonkori_House2.png",
    title: "House",
    type: "image",
    category: "environment",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
  },
  {
    id: "tonkori-house-3",
    url: "/tonkori/Tonkori_House3.png",
    title: "House",
    type: "image",
    category: "screenshot",
    gameId: "tonkori",
    collaboratorId: "sayyidali",
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
  },
  {
    id: "bunny",
    url: "/tinycare/Bunny.jpeg",
    title: "Bunny",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
  {
    id: "cat",
    url: "/tinycare/Cat.jpeg",
    title: "Cat",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
  {
    id: "gigaduck",
    url: "/tinycare/Gigaduck.png",
    title: "GigaDuck",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
  {
    id: "potato",
    url: "/tinycare/Potato.png",
    title: "Potato",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
  {
    id: "rock",
    url: "/tinycare/Rock.jpeg",
    title: "Rock",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
  {
    id: "dog",
    url: "/tinycare/Dog.jpg",
    title: "Dog",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
  {
    id: "turtle",
    url: "/tinycare/Turtle.jpg",
    title: "Turtle",
    type: "image",
    category: "characters",
    gameId: "tinycare",
    collaboratorId: "sage",
  },
];

export function getGameGallery(gameId: GameId) {
  return mediaData.filter((m) => m.gameId === gameId);
}

export function getCollaboratorMedia(collaboratorId: CollaboratorId) {
  return mediaData.filter((m) => m.collaboratorId === collaboratorId);
}
