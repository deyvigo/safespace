import { CATEGORIES, TYPES } from "../../constants/digitalResources";
import ResourceCardButton from "./ResourceCardButton";
import { Trash2, SquarePen, Eye, EyeClosed } from "lucide-react";

export default function ResourceCard({ userId, resource, onEdit, onDelete, onPublish, onUnpublish }) {

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
      <div className="w-full md:w-[48%] lg:w-[45%] flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
            {resource.title}
          </h3>
          <p className="text-gray-600 mb-3 text-wrap whitespace-normal break-all max-h-[150px] md:max-h-[250px] overflow-auto">
            {resource.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {CATEGORIES.find((c) => c.value === resource.category)?.label ||
                resource.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {TYPES.find((t) => t.value === resource.type)?.label ||
                resource.type}
            </span>
            {resource.link && (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                Ver recurso
              </a>
            )}
          </div>

          {/* Metadata */}
          {resource.link && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>Enlace</span>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-[52%] lg:w-[55%] flex flex-col md:flex-row justify-between gap-2 h-full">
        {/* Images */}
        <div className="flex justify-end gap-x-2">
          {resource.images.map((el) => (
            <div className="h-[120px] md:h-[150px] w-full md:w-[70px] lg:w-[90px] overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={el.public_url}
                alt=""
              />
            </div>
          ))}
        </div>
        {/* Actions */}
        <div className="flex justify-end flex-row md:justify-start md:flex-col lg:flex-row gap-2 min-h-0 md:min-h-[150px]">
          {resource.published ? (
            <ResourceCardButton
              info={"Ocultar"}
              colorInfo={{
                text: "text-purple-600",
                bg: "bg-purple-50",
                bgHover: "hover:bg-purple-100",
              }}
              icon={<EyeClosed width={20} />}
              action={() => onUnpublish(resource.id)}
            />
          ) : userId != resource.id_psychologist ? (
            <ResourceCardButton
              info={"Publicar"}
              colorInfo={{
                text: "text-green-600",
                bg: "bg-green-50",
                bgHover: "hover:bg-cyan-100",
              }}
              icon={<Eye width={20} />}
              action={() => onPublish(resource.id)}
            />
          ) : (
            <>
              <ResourceCardButton
                info={"Editar"}
                colorInfo={{
                  text: "text-blue-600",
                  bg: "bg-blue-50",
                  bgHover: "hover:bg-blue-100",
                }}
                icon={<SquarePen width={20} />}
                action={() => onEdit(resource)}
              />

              <ResourceCardButton
                info={"Eliminar"}
                colorInfo={{
                  text: "text-red-600",
                  bg: "bg-red-50",
                  bgHover: "hover:bg-red-100",
                }}
                icon={<Trash2 width={20} />}
                action={() => onDelete(resource.id)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
