from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset


class LeadViewSet(viewsets.ModelViewSet):
    # queryset = Lead.objects.all()
    permission_classes = [
        # permissions.AllowAny
        permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer

    # get only leads of authenticated user
    def get_queryset(self):
        return self.request.user.leads.all()

    # save the lead owner when lead is created
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
