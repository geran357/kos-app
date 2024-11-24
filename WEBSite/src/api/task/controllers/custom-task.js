module.exports = {
    async updateByDocumentId(ctx) {
      const { documentId } = ctx.params;
      const { completed, dateCompleted } = ctx.request.body.data;
  
      // Fetch the task using the documentId
      const task = await strapi.db.query('api::task.task').findOne({
        where: { documentId },
      });
  
      // Check if the task exists
      if (!task) {
        return ctx.notFound('Task not found');
      }
  
      // Update the task with new data
      const updatedTask = await strapi.db.query('api::task.task').update({
        where: { id: task.id },
        data: { completed, dateCompleted },
      });
  
      // Send the updated task as a response
      ctx.send(updatedTask);
    },
  };
  
  // Define the routes for the task API
  module.exports = {
    routes: [
      {
        method: 'PUT',
        path: '/tasks/documentId/:documentId',
        handler: 'custom-task.updateByDocumentId',
      },
    ],
  };